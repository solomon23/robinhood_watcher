// @flow
import * as appActions from '../actions/app'
import type { Action } from './types'

const defaultState = {
  actions: {
    portfolioLoading: false,
    positionsLoading: false,
    refreshing: false,
  },
  portfolio: {
  },
  positions: [
  ],
}

export default function app(state = defaultState, action: Action) {
  switch (action.type) {
    case appActions.START_REFRESH_TIMER: {
      const actions = { ...state.actions, refreshing: true }
      return { ...state, actions }
    }

    case appActions.STOP_REFRESH_TIMER: {
      const actions = { ...state.actions, refreshing: false }
      return { ...state, actions }
    }

    case appActions.GET_PORTFOLIO.REQUEST: {
      const actions = { ...state.actions, portfolioLoading: true }
      return { ...state, actions }
    }

    case appActions.GET_PORTFOLIO.FAILURE: {
      const actions = { ...state.actions, portfolioLoading: false }
      return { ...state, actions }
    }

    case appActions.GET_PORTFOLIO.SUCCESS: {
      const actions = { ...state.actions, portfolioLoading: false }
      return { ...state, actions, portfolio: action.response }
    }

    case appActions.GET_ACCOUNT_POSITIONS.REQUEST: {
      const actions = { ...state.actions, positionsLoading: true }
      return { ...state, actions }
    }

    case appActions.GET_ACCOUNT_POSITIONS.FAILURE: {
      const actions = { ...state.actions, positionsLoading: false }
      return { ...state, actions }
    }

    case appActions.GET_ACCOUNT_POSITIONS.SUCCESS: {
      const actions = { ...state.actions, positionsLoading: false }
      return { ...state, actions, positions: action.response }
    }

    default:
      return state
  }
}
