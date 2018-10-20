import path from 'path'
import menubar from 'menubar'
import { Tray } from 'electron'

const ICON_LOGO = path.join(__dirname, '../resources/icons/16x16.png')
let mb = null
let tray = null

export default {
  setTitle: (title) => {
    if (mb && mb.tray) {
      mb.tray.setTitle(title)
    }
  },

  create: () => {
    tray = new Tray(ICON_LOGO)
    mb = menubar({
      dir: __dirname,
      icon: ICON_LOGO,
      preloadWindow: true,
      index: `file://${__dirname}/app.html`,
      width: 250,
      height: 500,
      tray,
      resizable: false,
      webPreferences: {
        experimentalFeatures: true,
      },
    })

    mb.tray.setTitle(`-`)
    mb.showWindow()
  },
}
