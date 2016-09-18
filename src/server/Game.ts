import Ship from './Ship';
import Player from "./Player";
import * as _ from 'lodash';
import {Messages, ChangeRoleMessage} from "../shared/messages/Messages";
import {UpdateShipMessage} from "../shared/messages/Messages";
import {Socket} from "net";

export default class Game {

    private players: {[id: string]: Player} = {};
    private ship: IShip = new Ship();

    constructor() {
        setInterval(this.removeDisconnectedPlayer.bind(this), 5000);
        setInterval(this.broadcastState.bind(this), 100);
    }

    addPlayer(socket:Socket) {
        const player: Player = new Player(socket);
        this.players[player.id] = player;

        socket.on('data', (stringData: string) => this.onDataFromPlayer(player, JSON.parse(stringData)));
        socket.on('close', () => this.removePlayer(player));
        socket.on('end', () => this.removePlayer(player));
        socket.on('destroy', () => this.removePlayer(player));
        socket.on('timeout', () => this.removePlayer(player));
        player.send({kind: 'connected'});
    }

    onDataFromPlayer(player: Player, message: IMessage) {
        switch (message.kind) {
            case Messages.CHANGE_ROLE:
                player.changeRole((<ChangeRoleMessage>message).role);
                this.broadcastState();
                break;
        }
    }

    broadcastState() {
        const message: UpdateShipMessage = new UpdateShipMessage(this.ship);

        _(this.players)
            .forEach((player: Player) => {
                player.send(message);
            });
    }

    removePlayer(player) {
        delete this.players[player.id];
    }

    removeDisconnectedPlayer() {
        // _(this.players)
        //     .filter((player:Player)=>{player.socket.isD
        //     .forEach((player) => this.removePlayer(player));
    }
}