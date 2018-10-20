// @flow
import { GET_PORTFOLIO, GET_ACCOUNT_POSITIONS, STOP_REFRESH_TIMER, START_REFRESH_TIMER } from '../actions/app'
import type { Action } from './types'

const defaultState = {
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

export default function app(state = defaultState, action: Action) {
  switch (action.type) {
    case START_REFRESH_TIMER:
      return { ...state, refreshing: true }

    case STOP_REFRESH_TIMER:
      return { ...state, refreshing: false }

    case GET_PORTFOLIO.REQUEST: {
      const actions = { ...state.actions, portfolioLoading: true }
      return { ...state, actions }
    }

    case GET_PORTFOLIO.FAILURE: {
      const actions = { ...state.actions, portfolioLoading: false }
      return { ...state, actions }
    }

    case GET_PORTFOLIO.SUCCESS: {
      const actions = { ...state.actions, portfolioLoading: false }
      return { ...state, actions, portfolio: action.response }
    }

    case GET_ACCOUNT_POSITIONS.REQUEST: {
      const actions = { ...state.actions, positionsLoading: true }
      return { ...state, actions }
    }

    case GET_ACCOUNT_POSITIONS.FAILURE: {
      const actions = { ...state.actions, positionsLoading: false }
      return { ...state, actions }
    }

    case GET_ACCOUNT_POSITIONS.SUCCESS: {
      const actions = { ...state.actions, positionsLoading: false }
      return { ...state, actions, positions: action.response }
    }

    default:
      return state
  }
}
