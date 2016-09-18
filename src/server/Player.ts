import {Socket} from "net";

export default class Player {
    static playerCount: number = 0;
    public id: string;
    public socket: Socket;
    public role: string;

    constructor(socket:Socket) {
        this.id = `${Player.playerCount++}-${new Date().getUTCMilliseconds()}-${Math.floor(Math.random() * 10000)}`;
        this.socket = socket;
        this.role = ROLE.NONE;
    }

    public send(message:IMessage) {
        this.socket.write(JSON.stringify(message) + '\r\n');
    }

    public changeRole(role:string) {
        if(ROLE.hasOwnProperty(role)){
            this.role = role;
        }
    }

}
export const ROLE = {
    NONE:'NONE',
    PILOT:'PILOT',
    CAPTAIN:'CAPTAIN',
};
