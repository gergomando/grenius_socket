var SocketIOClient = require('socket.io-client');
var socket = SocketIOClient('http://localhost:1848');
var uuidv1 = require('uuid/v1');
var gameID = null;
socket.emit('want-to-join', {
	id: uuidv1(),
	name: 'Ákos',
	phone: '+36306500546',
	address: 'Budapest',
});

socket.on('player-joined', (res) => {
	if(res.gameID && !gameID) gameID = res.gameID;
	if(gameID !== res.gameID) return;
	console.warn(res.msg);
	console.warn('gameID: ' + res.game.id);
	console.warn('players: ' + res.game.players);
});