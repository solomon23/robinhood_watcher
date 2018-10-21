// @flow
import * as appActions from '../actions/app'
import { USD } from '../services/utils'

const defaultState = {
  title: '-',
}

export default function toolbar(state: any = defaultState, action: Action) {
  switch (action.type) {
    case appActions.GET_PORTFOLIO.SUCCESS:
      return { ...state, title: USD(action.response.extended_hours_equity || action.response.equity) }

    default:
      return state
  }
}
