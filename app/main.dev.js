/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron'
import Toolbar from './toolbar'

let mainWindow = null
let stockInfoWindow = null

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')()
  const path = require('path')
  const p = path.join(__dirname, '..', 'app', 'node_modules')
  require('module').globalPaths.push(p)
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log)
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions()
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 250,
    height: 500,
    // width: 825,
    // height: 625,
  })

  Toolbar.create()
  // mainWindow.loadURL(`file://${__dirname}/app.html`)
  // mainWindow.loadURL(`file://${__dirname}/app.html?symbol=GAMR`)

  ipcMain.on('SET_MENU_TITLE', (event, arg) => {
    Toolbar.setTitle(arg)
  })

  ipcMain.on('APP_QUIT', () => app.quit())

  ipcMain.on('CHART', (event, data) => {
    const { symbol } = data
    createStockWindow(symbol)
  })

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

const createStockWindow = async (symbol) => {
  if (stockInfoWindow !== null) {
    stockInfoWindow.destroy()
  }

  stockInfoWindow = new BrowserWindow({
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
