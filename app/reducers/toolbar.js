// @flow
import * as appActions from '../actions/app'
import type { Action } from './types'
import { USD } from '../services/utils'

export default function toolbar(state: string = 'loading', action: Action) {
  switch (action.type) {
    case appActions.GET_PORTFOLIO.SUCCESS:
      return USD(action.response.extended_hours_equity || action.response.equity)

    default:
      return state
  }
}
