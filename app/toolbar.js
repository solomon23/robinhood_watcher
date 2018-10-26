import path from 'path';
import menubar from 'menubar';
import { Tray, nativeImage } from 'electron';

const ICON_LOGO_PATH = path.join(__dirname, '../resources/icons/16x16.png');
const ICON_LOGO = nativeImage.createFromPath(ICON_LOGO_PATH);

let mb = null;
let tray = null;

export default {
  setTitle: title => {
    if (mb && mb.tray) {
      mb.tray.setTitle(title);
    }
  },

  create: () => {
    tray = new Tray(ICON_LOGO);
    mb = menubar({
      dir: __dirname,
      icon: ICON_LOGO_PATH,
      preloadWindow: true,
      index: `file://${__dirname}/app.html?__dirname=${__dirname}`,
      width: 250,
      height: 500,
      tray,
      resizable: false,
      webPreferences: {
        experimentalFeatures: true
      }
    });

    mb.tray.setTitle(`-`);
    mb.showWindow();

    return mb;
  }
};
