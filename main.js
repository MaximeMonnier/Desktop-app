require('dotenv').config();
const { app, BrowserWindow, Notification} = require("electron");

// require("./src/js/database");
require("electron-reload")(__dirname);

function NewWindow() {
  window = new BrowserWindow({
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
      }
  });

  window.loadFile("./src/ui/index.html");
}

app.allowRendererProcessReuse = true;
app.whenReady().then(NewWindow);