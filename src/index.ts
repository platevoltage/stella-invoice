import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';

const isMac = process.platform === 'darwin';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 780,
    height: isMac ? 580 : 610,
    title: "Stella Invoice",
    // fullscreen: true,
    // kiosk: true,
    // visualEffectState: "active",
    // vibrancy: 'sidebar',
    resizable: false,
    // maximizable: false,
    // movable: false,
    titleBarStyle: isMac ? "hiddenInset" : "default",
    
    // useContentSize: true,
    // frame: false,
    // show: false,
    webPreferences: {
      enableBlinkFeatures: "CSSColorSchemeUARendering",
      // nodeIntegration: false,
      // contextIsolation: true,
      // preload: path.join(__dirname, 'extensionScript.js')
    }
  });

  win.loadFile(path.join(__dirname, './build/index.html')) 

  win.on('page-title-updated', function(e) {
    e.preventDefault()
  });
  return win
      
};


app.whenReady().then(async () => {

  const win = createWindow();
  win.webContents.executeJavaScript('console.log("test")')
  // note: your contextMenu, Tooltip and Title code will go here!
  const menu = Menu.buildFromTemplate([
    {
      label: app.name, 
      submenu: [
        { label: "Quit", role: 'quit' }
      ]
    }
  ]);
  Menu.setApplicationMenu(isMac ? menu : null);
})


app.on('window-all-closed', () => {
    app.quit();
});

