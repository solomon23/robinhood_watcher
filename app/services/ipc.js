import { ipcRenderer } from 'electron'
import { closeSettingsWindow } from './windows'
import * as settingsActions from '../actions/settings'
import * as appActions from '../actions/app'
import * as userActions from '../actions/user'
import * as api from './api'

export function listen(store: Store) {
  ipcRenderer.on('USER_SETTINGS', (event, arg) => {
    store.dispatch(settingsActions.updateSettings(arg))
  })

  ipcRenderer.on('QUIT', () => {
    store.dispatch(appActions.appQuit())
  })

  ipcRenderer.on('LOGOUT', () => {
    closeSettingsWindow()
    store.dispatch(userActions.logout())
  })

  ipcRenderer.on('USER_SETTINGS_SAVE', (events, arg) => {
    // save to the disk store
    api.setSettings(arg)

    // update the redux store
    store.dispatch(settingsActions.updateSettings(arg))

    // kill the settings window
    closeSettingsWindow()

    // stop and restart the refresh timer
    store.dispatch(appActions.stopRefreshTimer())
    store.dispatch(appActions.startRefreshTimer())
  })
}

export function setTitle(title) {
  ipcRenderer.send('SET_MENU_TITLE', title)
}

export function saveSettings(settings) {
  ipcRenderer.send('MAIN_WINDOW', { channel: 'USER_SETTINGS_SAVE', message: settings })
}

export function quit() {
  ipcRenderer.send('MAIN_WINDOW', { channel: 'QUIT' })
}

export function logout() {
  ipcRenderer.send('MAIN_WINDOW', { channel: 'LOGOUT' })
}
