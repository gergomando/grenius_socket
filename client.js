var SocketIOClient = require('socket.io-client');
var socket = SocketIOClient('http://188.166.24.233:3000');
var gameID = null;

socket.emit('want-to-join', {
	name: 'Péter',
	phone: '+36306500546',
	address: 'Budapest',
});

socket.on('player-joined', (res) => {
	if(res.gameID && !gameID) gameID = res.gameID;
	if(gameID === res.gameID) {
		console.warn(res.msg);
		console.warn('gameID: ' + res.game.id);
		console.warn('players: ' + res.game.players);
	}
});