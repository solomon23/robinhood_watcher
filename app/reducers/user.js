// @flow
import * as userActions from '../actions/user'
import * as appActions from '../actions/app'

const defaultState = {
  isLoading: false,
  isError: false,
  errorReason: null,
  needsMfa: false,
  authenticated: false,
  accountNumber: null,
}

export default function(state: any = defaultState, action: Action) {
  switch (action.type) {
    case userActions.LOGIN_USER_LOADING:
      return { ...defaultState, isLoading: true, authenticated: false }

    case userActions.LOGIN_USER_ERROR:
      return { ...defaultState, isError: true, errorReason: action.message }

    case userActions.LOGIN_USER_NEEDS_MFA:
      return { ...defaultState, needsMfa: true, authenticated: false }

    case userActions.LOGIN_USER_SUCCESS:
      return { ...defaultState, authenticated: action.response.authenticated }

    case appActions.GET_ACCOUNT_NUMBER.SUCCESS:
      return { ...state, accountNumber: action.response }

    case userActions.USER_LOGOUT:
      return { ...defaultState, authenticated: false }

    default:
      return state
  }
}
