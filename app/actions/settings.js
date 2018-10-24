// @flow
import { getSettings } from '../services/api'
import * as ipc from '../services/ipc'

export const VIEW_BY = {
  PERCENT: 'PERCENT',
  TOTAL: 'TOTAL',
  INDIVIDUAL: 'INDIVIDUAL',
}

export const SETTINGS_UPDATE = 'SETTINGS_UPDATE'
export function updateSettings(settings: UserSettings) {
  return { type: SETTINGS_UPDATE, payload: settings }
}

export function loadSettings() {
  return (dispatch: Dispatch) => {
    // get the settings from the local store
    const settings = getSettings()

    if (settings) {
      dispatch(updateSettings(settings))
    }
  }
}

export function saveSettings(settings: UserSettings) {
  return (dispatch: Dispatch) => {
    // update it locally
    dispatch(updateSettings(settings))

    // save it over the wire
    ipc.saveSettings(settings)
  }
}

export function quit() {
  return () => {
    ipc.quit()
  }
}

export function logout() {
  return () => {
    ipc.logout()
  }
}
