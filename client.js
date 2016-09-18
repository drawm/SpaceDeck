const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const net = require('net');

const server = require('./bin/server/server/Server');


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

        // and load the index.html of the client.
        this.mainWindow.loadURL(`file://${__dirname}/bin/client/index.html`);

        // Open the DevTools.
        this.mainWindow.webContents.openDevTools();

        // Emitted when the window is closed.
        this.mainWindow.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your client supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.mainWindow = null;
        });

        electron.ipcMain.on('boot', (event, data)=> {

            const client = new net.Socket();
            client.connect(1337, '127.0.0.1', function () {
                const message = JSON.stringify({event: 'changeRole', role: "CAPTAIN"});
                client.write(message);
            });

            client.on('data', (stringData) => {
                const messages = stringData.toString()
                    .split('\r\n')
                    .filter(value => !!value)
                    .map(JSON.parse);

                messages.forEach((message)=>{
                    event.sender.send('changeState', message);
                });
            });

            client.on('close', () => {
            });
        });
    }
}


new Client();
