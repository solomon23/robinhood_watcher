import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import * as actions from '../user'

const mockStore = configureMockStore([thunk])

describe('user actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('should fire logout', () => {
    expect(actions.logout()).toMatchSnapshot()
  })

  it('should fire login', () => {
    fetchMock.mock('https://api.robinhood.com/oauth2/token/',
      { body: { access_token: 10, refresh_token: 20 } }
    )
    const store = mockStore({ user: { authenticated: false, accountNumber: null } })

    return store.dispatch(actions.login('joe', 'pass', 'mfa'))
      .then(() => {
        expect(store.getActions()).toMatchSnapshot()
        return null
      })
  })

  it('should succeeded at trying to authenticate', () => {
    fetchMock.mock('https://api.robinhood.com/accounts/',
      { body: { results: {} } }
    )
    const store = mockStore({ user: { authenticated: false, accountNumber: null } })

    return store.dispatch(actions.tryAuth())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot()
        return null
      })
  })

  it('should fail at trying to authenticate', () => {
    fetchMock.mock('https://api.robinhood.com/accounts/', 401)
    fetchMock.mock('https://api.robinhood.com/oauth2/token/', 401)
    const store = mockStore({ user: { authenticated: false, accountNumber: null } })

    return store.dispatch(actions.tryAuth())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot()
        return null
      })
  })

  it('should succeeded at refreshing the token', () => {
    fetchMock.config.overwriteRoutes = false
    fetchMock.once('https://api.robinhood.com/accounts/', 401)
    fetchMock.once('https://api.robinhood.com/accounts/',
      { body: { results: {} } }
    )
    fetchMock.mock('https://api.robinhood.com/oauth2/token/',
      { body: { access_token: 10, refresh_token: 20 } }
    )
    const store = mockStore({ user: { authenticated: false, accountNumber: null } })

    return store.dispatch(actions.tryAuth())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot()
        return null
      })
  })
})
