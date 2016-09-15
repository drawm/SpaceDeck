class Player {
    constructor(socket) {
        this.id = `${Player.playerCount++}-${new Date().getUTCMilliseconds()}-${Math.floor(Math.random() * 10000)}`;
        this.socket = socket;
        this.role = '';
    }

    send(data) {
        this.socket.write(JSON.stringify(data)+'\r\n');
    }

    changeRole(role) {
        this.role = role;
    }

}
Player.playerCount = Player.playerCount || 0;
const ROLES = {
    PILOT: 'PILOT',
    CAPTAIN: 'CAPTAIN',
}
module.exports = Player;