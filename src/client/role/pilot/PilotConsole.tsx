import * as React from 'react';
import Map from '../../components/Map';
import Engine from "../../components/Engine";
import {IGlobalProps} from "../../GlobalPops";

export default class PilotConsole extends React.Component<IGlobalProps,any> {
    render() {
        return (<div>
            <h1>Pilot</h1>
            <Map shipStore={this.props.shipStore} />
            <Engine/>
        </div>);
    }
}
