import IpcRenderer = Electron.IpcRenderer;
import IpcRendererEvent = Electron.IpcRendererEvent;
import ShipStore from "./ship/ShipStore";
import {UpdateShipMessage} from "../shared/messages/Messages";
import {observer} from 'mobx-react';
import {render} from 'react-dom';
import * as React from "react";

const ipc = require('electron').ipcRenderer;
ipc.send('boot', null);

const shipStore: ShipStore = new ShipStore();

ipc.on('message', (event: IpcRendererEvent, message: IMessage) => {
    shipStore.update((message as UpdateShipMessage).ship);
});
interface AppProps{
    shipStore:ShipStore;
}

@observer
class App extends React.Component<AppProps,any> {
    constructor(props:AppProps, state:any){
        super(props, state);
    }

    render() {
        return (
            <div>
                {this.props.shipStore.x}
                {this.props.shipStore.y}
            </div>
        );
    }
}


const appElement: HTMLDivElement = document.createElement('div') as HTMLDivElement;
document.body.appendChild(appElement);
render(<div><App shipStore={shipStore} /></div>, appElement);
