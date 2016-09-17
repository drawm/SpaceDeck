import { Socket } from 'net';
import IpcMainEvent = Electron.IpcMainEvent;
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;


class Client {
    // Create the browser window.
    private mainWindow = new BrowserWindow({width : 800, height : 600});

    private app:Electron.App;

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

        electron.ipcMain.on('boot', (event:IpcMainEvent) => {
            let state:any = {};

            const client = new Socket();
            client.connect(1337, '127.0.0.1', function () {
                const message:String = JSON.stringify({event : 'changeRole', role : "CAPTAIN"});
                client.write(message);
            });

            client.on('data', (stringData:String) => {
                state = stringData.toString()
                    .split('\r\n')
                    .filter(value => !!value)
                    .map(value => JSON.parse(value))
                    .filter(value => !!value.state)
                    .reduce(Object.assign);
                event.sender.emit('changeState', state);
            });

            client.on('close', function () {
            });
        }
    )
        ;
    }
}

new Client();
