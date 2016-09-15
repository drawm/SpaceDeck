const Game = require('./Game');
const net = require('net');

const game = new Game();

const server = net.createServer((socket)=> {
    game.addPlayer(socket);

    socket.on('error', (error) => {
        if (error.errno !== 'ECONNRESET') {
            console.log(error);
        }
    });

});


server.listen(1337, '127.0.0.1');