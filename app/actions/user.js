import { authenticate, tryAuthenticate } from '../services/api'
import type { Dispatch } from '../reducers/types'

export const LOGIN_USER_LOADING = 'LOGIN_USER_LOADING'
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_NEEDS_MFA = 'LOGIN_USER_NEEDS_MFA'
export const USER_LOGOUT = 'USER_LOGOUT'
export const SET_USER_ACCOUNT_NUMBER = 'SET_USER_ACCOUNT_NUMBER'

export function login(username, password, mfaCode) {
  return (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_USER_LOADING })

    return authenticate(username, password, mfaCode)
      .then(response => {
        if (response.twoFactorAuthRequired && !mfaCode) {
          dispatch({ type: LOGIN_USER_NEEDS_MFA })
        } else if (response.authenticated) {
          dispatch({ type: LOGIN_USER_SUCCESS, response })
        } else {
          dispatch({ type: LOGIN_USER_ERROR, message: response.error })
        }

        return null
      }).catch(err => {
        dispatch({ type: LOGIN_USER_ERROR, error: err })
      })
    }
}

export function tryAuth() {
  return (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_USER_LOADING })

    return tryAuthenticate()
      .then(response => {
        if (response.authenticated) {
          dispatch({ type: LOGIN_USER_SUCCESS, response })
        } else {
          dispatch({ type: LOGIN_USER_ERROR, message: response.error })
        }

        return null
      }).catch(err => {
        dispatch({ type: LOGIN_USER_ERROR, error: err })
      })
    }
}

export function logout() {
  return {
    type: USER_LOGOUT,
  }
}