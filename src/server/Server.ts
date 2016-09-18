import Game from "./Game";
import * as net from "net";
import ErrnoException = NodeJS.ErrnoException;

const game:Game = new Game();

const server = net.createServer((socket:net.Socket)=> {
    game.addPlayer(socket);

    socket.on('error', (error:ErrnoException) => {
        if (error.errno !== 'ECONNRESET') {
            console.log(error);
        }
    });
});

server.listen(1337, '127.0.0.1');