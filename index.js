var express = require('express');
var http = require('http')
var socketio = require('socket.io');
var uuidv1 = require('uuid/v1');

var app = express();
var server = http.Server(app);
var websocket = socketio(server);

var playerLimit = 2;
var Games = [
	{ id: 1, players: [] },
	{ id: 2, players: [] },
	{ id: 3, players: [] },
];

function Game(id) {
	this.id = id;
	this.players = [];
}

function createGame() {
		var game = new Game(uuidv1());
		Games.push(game);
		return game;
};

server.listen(1848, () => console.log('listening on *:1848'));
websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);

  socket.on('gameOperation', (client) => {
  	game = Games.find(game => game.id === client.gameID);
		player = game.players.find(player => player.id === client.playerID);
		player.pos = client.params;
  	websocket.emit('game-' + client.gameID, {
			msg: 'Player moved!',
			game,
		});
  });

  socket.on('want-to-join', (client) => {
  	game = Games.find(game => game.id === client.gameID);
  	game.players.push(client.player);
  	websocket.emit('game-' + client.gameID, {
			msg: client.player.name + ' joined!',
			game,
		});
  });

});
