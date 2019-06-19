const electron = require('electron');
const { shell, app, BrowserWindow } = electron;
const HOMEPAGE = 'https://accounts.google.com/signin/v2/sl/pwd?service=CPanel&flowName=GlifWebSignIn&flowEntry=ServiceLogin'
const path = require('path');
const iconPath = path.join(__dirname, 'icon.ico')

let mainWindow;

app.on('ready', () => {
    window = new BrowserWindow({
        
        width: 1200,
        height: 900,

        icon: iconPath,

        webPreferences: {
          nodeIntegration: false,
          enableBlinkFeatures: 'CSSVariables',
        }
        
    });

    window2 = new BrowserWindow({
        
        width: 1200,
        height: 900,

        fullscreen: true,
        icon: iconPath,

        webPreferences: {
          nodeIntegration: false,
          enableBlinkFeatures: 'CSSVariables',
          webviewTag: true
        }
        
    });

    window.setMenuBarVisibility(false);
    window.loadURL(HOMEPAGE);
    window2.setMenuBarVisibility(false);

    

    window.webContents.on('will-navigate', (ev, url) => {
        parts = url.split('/');
        if (parts[0] + '//' + parts[2] != HOMEPAGE) {
            ev.preventDefault();
            shell.openExternal(url);
        };
    });
    

    window.on('closed', () => {
        window = null;
        window2.loadURL('file://' + __dirname + '/index.html');
    });

    window2.on('closed', () => {
        window2 = null;
    });
});