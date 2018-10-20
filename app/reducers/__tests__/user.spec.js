import reducer from '../user'
import * as appActions from '../../actions/app'
import * as userActions from '../../actions/user'

const initialState = {
  isLoading: false,
  isError: false,
  errorReason: null,
  needsMfa: false,
  authenticated: false,
  accountNumber: null,
}

describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle LOGIN_USER_LOADING', () => {
    expect(
      reducer({}, {
        type: userActions.LOGIN_USER_LOADING,
      })
    ).toMatchSnapshot()
  })

  it('should handle LOGIN_USER_ERROR', () => {
    expect(
      reducer({}, {
        type: userActions.LOGIN_USER_ERROR,
        message: 'bad',
      })
    ).toMatchSnapshot()
  })

  it('should handle LOGIN_USER_NEEDS_MFA', () => {
    expect(
      reducer({}, {
        type: userActions.LOGIN_USER_NEEDS_MFA,
      })
    ).toMatchSnapshot()
  })

  it('should handle LOGIN_USER_SUCCESS', () => {
    expect(
      reducer({}, {
        type: userActions.LOGIN_USER_SUCCESS,
        response: { authenticated: true },
      })
    ).toMatchSnapshot()
  })

  it('should handle GET_ACCOUNT_NUMBER.SUCCESS', () => {
    expect(
      reducer({}, {
        type: appActions.GET_ACCOUNT_NUMBER.SUCCESS,
        response: '123',
      })
    ).toMatchSnapshot()
  })

  it('should handle USER_LOGOUT', () => {
    expect(
      reducer({ authenticated: true }, {
        type: userActions.USER_LOGOUT,
      })
    ).toMatchSnapshot()
  })
})
