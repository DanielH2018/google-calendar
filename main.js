const electron = require('electron');
const { shell, app, BrowserWindow } = electron;
const HOMEPAGE = 'https://accounts.google.com/signin/v2/identifier?service=cl&passive=1209600&osid=1&continue=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Frender&followup=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Frender&scc=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin'
const path = require('path');
const iconPath = path.join(__dirname, 'icon.ico')
const fs = require('fs');

let mainWindow;

app.on('ready', () => {
    window = new BrowserWindow({
        
        width: 1200,
        height: 900,

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