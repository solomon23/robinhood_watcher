import reducer from '../app'
import * as ActionTypes from '../../actions/app'

const initialState = {
  actions: {
    portfolioLoading: false,
    positionsLoading: false,
  },
  portfolio: {
  },
  positions: [
  ],
  refreshing: false,
}

describe('App reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle START_REFRESH_TIMER', () => {
    expect(
      reducer({}, {
        type: ActionTypes.START_REFRESH_TIMER,
      })
    ).toMatchSnapshot()
  })

  it('should handle STOP_REFRESH_TIMER', () => {
    expect(
      reducer({}, {
        type: ActionTypes.STOP_REFRESH_TIMER,
      })
    ).toMatchSnapshot()
  })

  it('should handle GET_PORTFOLIO.REQUEST', () => {
    expect(
      reducer({}, {
        type: ActionTypes.GET_PORTFOLIO.REQUEST,
      })
    ).toMatchSnapshot()
  })

  it('should handle GET_PORTFOLIO.FAILURE', () => {
    expect(
      reducer({}, {
        type: ActionTypes.GET_PORTFOLIO.FAILURE,
      })
    ).toMatchSnapshot()
  })

  it('should handle GET_PORTFOLIO.SUCCESS', () => {
    expect(
      reducer({}, {
        type: ActionTypes.GET_PORTFOLIO.SUCCESS,
      })
    ).toMatchSnapshot()
  })

  it('should handle GET_ACCOUNT_POSITIONS.REQUEST', () => {
    expect(
      reducer({}, {
        type: ActionTypes.GET_ACCOUNT_POSITIONS.REQUEST,
      })
    ).toMatchSnapshot()
  })

  it('should handle GET_ACCOUNT_POSITIONS.FAILURE', () => {
    expect(
      reducer({}, {
        type: ActionTypes.GET_ACCOUNT_POSITIONS.FAILURE,
      })
    ).toMatchSnapshot()
  })

  it('should handle GET_ACCOUNT_POSITIONS.SUCCESS', () => {
    expect(
      reducer({}, {
        type: ActionTypes.GET_ACCOUNT_POSITIONS.SUCCESS,
        response: [],
      })
    ).toMatchSnapshot()
  })
})
