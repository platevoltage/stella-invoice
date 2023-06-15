import { app, BrowserWindow, Menu } from "electron";
import { join } from "path";
import { is } from "@electron-toolkit/utils";
// import icon from '../../resources/icon.png?asset';

const isMac = process.platform === "darwin";

const createWindow = (): BrowserWindow => {
    const win = new BrowserWindow({
        width: 834,
        height: isMac ? 590 : 610,
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
            enableBlinkFeatures: "CSSColorSchemeUARendering"
            // nodeIntegration: false,
            // contextIsolation: true,
            // preload: path.join(__dirname, 'extensionScript.js')
        }
    });

    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
        win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    } else {
        win.loadFile(join(__dirname, "../renderer/index.html"));
    }

    win.on("page-title-updated", function (e) {
        e.preventDefault();
    });
    return win;
};

app.whenReady().then(async () => {
    const win = createWindow();
    win.webContents.executeJavaScript("console.log(\"test\")");
    // note: your contextMenu, Tooltip and Title code will go here!
    const menu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [{ label: "Quit", role: "quit" }]
        }
    ]);
    Menu.setApplicationMenu(isMac ? menu : null);
});

app.on("window-all-closed", () => {
    app.quit();
});
