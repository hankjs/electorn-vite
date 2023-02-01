import { app, BrowserWindow } from "electron";
import { CustomScheme } from "./CustomScheme";
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  let config = {
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
  };
  mainWindow = new BrowserWindow(config);
  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL(`app://index.html`);
  }
});