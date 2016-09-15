const Player = require('./Player');
const Ship = require('./Ship');
const _ = require('lodash');

module.exports = class Game {

    constructor() {
        this.players = {};
        this.ship = new Ship();
        setInterval(this.removeDisconnectedPlayer.bind(this), 5000);
        setInterval(this.broadcastState.bind(this), 100);
    }

    addPlayer(socket) {
        const player = new Player(socket);
        this.players[player.id] = player;

        socket.on('data', (stringData) => this.onDataFromPlayer(player, JSON.parse(stringData)));
        socket.on('close', () => this.removePlayer(player));
        socket.on('end', () => this.removePlayer(player));
        socket.on('destroy', () => this.removePlayer(player));
        socket.on('timeout', () => this.removePlayer(player));
        player.send({event: 'connected'});
    }

    onDataFromPlayer(player, data) {
        console.log(JSON.stringify(data));
        if(data.event === 'changeRole'){
            player.changeRole(data.role);
            this.broadcastState();
        }
    }

    broadcastState(){
        const newState = {
            event: 'changeState',
            state: {
                ship: this.ship,
            }
        };

        _.forEach(this.players, (player)=>{
            player.send(newState);
        });
    }


    removePlayer(player) {
        _.unset(this.players, player.id);
    }

    removeDisconnectedPlayer() {
        _(this.players)
            .filter('diconnected')
            .forEach((player) => this.removePlayer(player));
    }
};