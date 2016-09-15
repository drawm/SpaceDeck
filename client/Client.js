const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const net = require('net');


class Client {

    constructor() {
        this.app = electron.app;
        this.app.on('ready', this.createWindow);

        this.app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                this.app.quit()
            }
        });

        this.app.on('activate', () => {
            if (this.mainWindow === null) {
                this.createWindow()
            }
        });
    }


    createWindow() {
        // Create the browser window.
        this.mainWindow = new BrowserWindow({width: 800, height: 600});

        // and load the index.html of the app.
        this.mainWindow.loadURL(`file://${__dirname}/index.html`);

        // Open the DevTools.
        this.mainWindow.webContents.openDevTools();

        // Emitted when the window is closed.
        this.mainWindow.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.mainWindow = null;
        });

        electron.ipcMain.on('boot', (event, data)=> {
            let state = {};

            const client = new net.Socket();
            client.connect(1337, '127.0.0.1', function () {
                const message = JSON.stringify({event: 'changeRole', role: "CAPTAIN"});
                client.write(message);
            });

            client.on('data', (stringData) => {
                state = stringData.toString()
                    .split('\r\n')
                    .filter(value => !!value)
                    .map(JSON.parse)
                    .filter(value => !!value.state)
                    .reduce(Object.assign);
                event.sender.send('changeState', state);
            });

            client.on('close', function () {
            });
        });
    }
};

new Client();
