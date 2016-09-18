import IpcRendererEvent = Electron.IpcRendererEvent;
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement('canvas');
document.body.appendChild(canvas);

const graphic = canvas.getContext('2d');



interface AppState{
    ship:IShip;
}

const renderWithState = (event:IpcRendererEvent, state:AppState)=> {
    graphic.clearRect(0, 0, window.innerWidth, window.innerHeight);
    graphic.fillRect(state.ship.transform.x, state.ship.transform.y, 5, 10);
    console.log(state);
};

const ipc = require('electron').ipcRenderer;
ipc.on('changeState', renderWithState);
ipc.send('boot', null);

window.onresize = (event: UIEvent) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
