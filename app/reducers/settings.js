// @flow
import * as settingsActions from '../actions/settings'

const defaultState = {
  refreshInterval: 10,
  viewChangeBy: settingsActions.VIEW_BY.TOTAL,
  notifyPercent: 0,
}

export default function(state: any = defaultState, action: Action) {
  switch (action.type) {
    case settingsActions.SETTINGS_UPDATE:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
