import { remote } from 'electron'

let stockInfoWindow = null
let settingsWindow = null

export const closeSettingsWindow = () => {
  settingsWindow.destroy()
  settingsWindow = null
}

export const createStockWindow = (symbol) => {
  if (stockInfoWindow !== null) {
    stockInfoWindow.destroy()
  }

  stockInfoWindow = new remote.BrowserWindow({
    width: 825,
    height: 625,
    backgroundColor: '#212025',
    center: false,
    title: symbol,
    resizable: false,
    titleBarStyle: 'hidden',
    show: true,
  })

  stockInfoWindow.loadURL(`file://${__dirname}/app.html?symbol=${symbol}`)

  stockInfoWindow.on('close', () => {
    stockInfoWindow = null
  })
}

export const createSettingsWindow = (settings) => {
  if (settingsWindow !== null) {
    settingsWindow.destroy()
  }

  settingsWindow = new remote.BrowserWindow({
    height: 470,
    width: 250,
    resizable: false,
    backgroundColor: '#212025',
    titleBarStyle: 'hidden',
  })

  settingsWindow.loadURL(`file://${__dirname}/app.html?settings=true`)

  settingsWindow.webContents.on('did-finish-load', () => {
    settingsWindow.webContents.send('USER_SETTINGS', settings)
  })

  settingsWindow.on('close', () => {
    settingsWindow = null
  })
}

export default {
  createStockWindow,
}
