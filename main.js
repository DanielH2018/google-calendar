const electron = require('electron');
const { shell, app, BrowserWindow } = electron;
const HOMEPAGE = 'https://calendar.google.com/calendar/r'
const path = require('path');
const iconPath = path.join(__dirname, 'icon.ico')
const fs = require('fs');

let mainWindow;

app.on('ready', () => {
    window = new BrowserWindow({
        
        width: 1200,
        height: 900,
        fullscreen: true,
        icon: iconPath,

        webPreferences: {
          nodeIntegration: false,
        }
        
    });

    window.setMenuBarVisibility(false);
    window.loadURL(HOMEPAGE);   

    window.webContents.on('dom-ready', () => {
        window.webContents.insertCSS(fs.readFileSync(__dirname + '/style.css', 'utf8'));
    });
    
    window.webContents.on('will-navigate', (ev, url) => {
        parts = url.split('/');
        if (parts[0] + '//' + parts[2] != HOMEPAGE) {
            ev.preventDefault();
            shell.openExternal(url);
        };
    });
    

    window.on('closed', () => {
        window = null;
    });

});