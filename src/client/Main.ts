import IpcRenderer = Electron.IpcRenderer;
import IpcRendererEvent = Electron.IpcRendererEvent;
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement('canvas');
document.body.appendChild(canvas);

const graphic = canvas.getContext('2d');


interface AppState {
    ship: IShip;
}

const renderWithState = (state: AppState)=> {
    graphic.clearRect(0, 0, window.innerWidth, window.innerHeight);
    graphic.fillRect(state.ship.transform.x, state.ship.transform.y, 5, 10);
    console.log(state);
};

const ipc = require('electron').ipcRenderer;
ipc.send('boot', null);

window.onresize = (event: UIEvent) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

class Store {
    private state: AppState = {
        ship: {
            transform: {
                x: 0,
                y: 0,
                rotation: 0,
            }
        }
    };

    private reduce(newState) {
        this.state = <AppState>Object.assign(this.state, newState);
    }

    private onChangeState(event: IpcRendererEvent, state: AppState) {
        this.reduce(state);
        renderWithState(this.state);
    }

    constructor(ipc: IpcRenderer) {
        ipc.on('changeState', (event: IpcRendererEvent, state: AppState)=>this.onChangeState(event,state));
    }
}

const store = new Store(ipc);
