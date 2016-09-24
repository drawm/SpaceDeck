import * as React from "react";
import IpcRenderer = Electron.IpcRenderer;
import IpcRendererEvent = Electron.IpcRendererEvent;
import ShipStore from "./ship/ShipStore";
import {UpdateShipMessage} from "../shared/messages/Messages";
import {render} from 'react-dom';
import PilotConsole from "./role/pilot/PilotConsole";

const ipc = require('electron').ipcRenderer;
ipc.send('boot', null);


const shipStore : ShipStore = new ShipStore();
ipc.on('message', (event: IpcRendererEvent, message: IMessage) => {
    ShipStore.update((message as UpdateShipMessage).ship);
});
interface AppProps {
    ShipStore: ShipStore;
}

class App extends React.Component<AppProps,any> {
    constructor(props: AppProps, state: any) {
        super(props, state);
    }

    render() {
        return (<PilotConsole shipStore={shipStore} />);
    }
}


const appElement: HTMLDivElement = document.createElement('div') as HTMLDivElement;
document.body.appendChild(appElement);
render(<App/>, appElement);
