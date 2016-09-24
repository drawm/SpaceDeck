import * as React from 'react';
import {observer, inject} from "mobx-react";
import ShipStore from "../ship/ShipStore";
import {IGlobalProps} from "../GlobalPops";


// @inject((allStores)=>({
//     shipStore: allStores.shipStore as ShipStore
// }))
@observer
class Map extends React.Component<IGlobalProps,any> {
    render() {
        return (<div>
            <h2>Map</h2>
            {this.props.shipStore.x}
            {this.props.shipStore.y}
        </div>);
    }
}


export default Map;
