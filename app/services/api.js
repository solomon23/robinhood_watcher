// @flow
import 'node-fetch'
import Store from 'electron-store'

const API_ROOT = 'https://api.robinhood.com'
const store = new Store()
const headers = {
  Origin: 'electron://robinhood-app',
  'content-type': 'application/json',
}

export function getToken(): { token: ?string, refresh_token: ?string } {
  return store.get('token') || { token: null, refresh_token: null }
}

function setToken(tokens) {
  store.set('token', tokens)
}

export function getSettings(): ?UserSettings {
  return store.get('settings') || null
}

export function setSettings(settings: UserSettings) {
  store.set('settings', settings)
}

function getErroFromJson(json) {
  let message = ''
  if (json.non_field_errors) {
    [message] = json.non_field_errors
  } else if (json.detail) {
    message = json.detail
  } else if (json.error) {
    message = json.error
  }

  return message
}

export function logout() {
  setToken({ token: null, refresh_token: null })
}

async function makeCall(url) {
  const res = await authRequest(`${API_ROOT}${url}`)
  const json = await res.json()

  if (res.ok) {
    return json
  }

  throw res.code
}

export async function getSMA(symbol: string): Promise<any> {
  return (await fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart/1d`)).json()
}

export async function getAccountNumber() {
  const json = await makeCall('/accounts/')
  return json.results[0].account_number
}

export async function getPortfolio({ user }: { user: User }): Promise<Portfolio> {
  const json = await makeCall(`/accounts/${user.accountNumber || ''}/portfolio/`)
  return json
}

export async function getWatchlist() {
  const json = await makeCall('/watchlists/Default/')

  return Promise.all(
    json.results.map(async result => {
      const instrument = await (await fetch(
        decodeURIComponent(result.instrument)
      )).json()

      return (await fetch(
        decodeURIComponent(instrument.quote)
      )).json()
    })
  )
}

export async function tryAuthenticate(): Promise<{ authenticated: boolean, error: ?string }> {
  try {
    const json = await makeCall('/accounts/')
    if (json && json.results) {
      return { authenticated: true, error: null }
    }

    return { authenticated: false, error: 'Error' }
  } catch(err) {
    return {
      authenticated: false,
      error: `${err}`,
    }
  }
}

export async function getAccountPositions({ user }: { user: User }): Promise<Array<Position>> {
  const positions = await makeCall(`/accounts/${user.accountNumber || ''}/positions/`)
  const transformed = await Promise.all(
    positions.results
      .filter(result => Number(result.quantity) !== 0)
      .map(async result => {
        const instrument = await (await fetch(
          decodeURIComponent(result.instrument)
        )).json()

        const quote = await (await fetch(
          decodeURIComponent(instrument.quote)
        )).json()

        return {
          ...quote,
          averageBuyPrice: Number(result.average_buy_price),
          quantity: Number(result.quantity),
          currentPrice: Number(quote.last_traded_price),
          symbol: instrument.symbol,
          name: instrument.name,
          instrument,
        }
      })
  )

  return transformed
}

async function authRequest(url: string, options: any = {}): Promise<any> {
  const { token } = getToken()

  const opts = {
    ...options,
    Accept: 'application/json',
    headers: {
      ...headers,
      Authorization: `Bearer ${token || ''}`,
    },
  }

  if (!token) {
    return { ok: false, code: 401, json: () => ({ error: 'Missing auth token', code: 401 }) }
  }

  let results = await fetch(url, opts)
  if (results.status === 401) {
    // try to refresh the token
    try {
      const refresh = await refreshAuthenticate()

      if (refresh.token) {
        setToken({ token: refresh.token, refresh_token: refresh.refresh_token })

        // try again
        opts.headers.Authorization = `Bearer ${token}`
        results = await fetch(url, opts)
      } else {
        setToken({ token: null, refresh_token: null })

        return { ok: false, code: 401, json: () => ({ error: 'Could not refresh token', code: 401 }) }
      }
    } catch (err) {
      // refresh failed
      setToken({ token: null, refresh_token: null })

      return { ok: false, code: 401, json: () => ({ error: 'Could not refresh token', code: 401 }) }
    }
  }

  return results
}

export async function refreshAuthenticate() {
  const { refresh_token: refreshToken } = getToken()

  try {
    const res = await fetch(`${API_ROOT}/oauth2/token/`, {
      method: 'POST',
      Accept: 'application/json',
      headers,
      body: JSON.stringify({
        'client_id': 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
        'grant_type': 'refresh_token',
        refresh_token: refreshToken,
      }),
    })

    const json = await res.json()
    if (res.ok) {
      return {
        twoFactorAuthRequired: !!json.mfa_required,
        token: json.access_token || null,
        refresh_token: json.refresh_token,
      }
    }

    // Get the error message from RobinHood and re-throw it
    const message = getErroFromJson(json)

    return {
      code: res.status,
      message,
    }
  } catch (error) {
    return {
      code: error.code,
      error: error.message,
    }
  }
}

export async function authenticate(username: string, password: string, mfaCode: ?string): Promise<any> {
  try {
    const body: any = {
      username,
      password,
      'client_id': 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
      'expires_in': '86400',
      'grant_type': 'password',
      'scope': 'internal',
    }

    if (mfaCode) {
      body.mfa_code = mfaCode
    }

    const res = await fetch(`${API_ROOT}/oauth2/token/`, {
      method: 'POST',
      Accept: 'application/json',
      headers,
      body: JSON.stringify(body),
    })

    const json = await res.json()
    if (res.ok) {
      setToken({ token: json.access_token, refresh_token: json.refresh_token })

      return {
        twoFactorAuthRequired: !!json.mfa_required,
        authenticated: !!json.access_token,
      }
    }

    // Get the error message from RobinHood and re-throw it
    const message = getErroFromJson(json)

    throw new Error(message)

  } catch (error) {
    return {
      error: error.message,
    }
  }
}
