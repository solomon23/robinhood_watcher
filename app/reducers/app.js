// @flow
import * as appActions from '../actions/app'

const defaultState = {
  actions: {
    portfolioLoading: false,
    positionsLoading: false,
    watchlistLoading: false,
    refreshing: false,
  },
  portfolio: {
  },
  positions: [
  ],
  watchlist: [
  ],
}

export default function(state: any = defaultState, action: Action) {
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

    case appActions.GET_WATCH_LIST.REQUEST: {
      const actions = { ...state.actions, watchlistLoading: true }
      return { ...state, actions }
    }

    case appActions.GET_WATCH_LIST.FAILURE: {
      const actions = { ...state.actions, watchlistLoading: false }
      return { ...state, actions }
    }

    case appActions.GET_WATCH_LIST.SUCCESS: {
      const actions = { ...state.actions, watchlistLoading: false }

      // filter out the ones already in our positions
      const lookup = state.positions.reduce((p, c) => (
        { ...p, [c.symbol]: true }
      ), {})

      const watchlist = action.response.filter(w => !lookup[w.symbol])

      return { ...state, actions, watchlist }
    }

    default:
      return state
  }
}
