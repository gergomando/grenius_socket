var express = require('express');
var http = require('http')
var socketio = require('socket.io');
var uuidv1 = require('uuid/v1');;

var app = express();
var server = http.Server(app);
var websocket = socketio(server);

var playerLimit = 3;
var defaultGame =  { id: uuidv1() , players: [] };
var Games = [];

server.listen(3000, () => console.log('listening on *:3000'));
websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);

  socket.on('want-to-join', (player) => {
  	var avaiableGames = Games.filter(game => game.players.length < playerLimit);
  	var game = defaultGame;
  	if(avaiableGames.length > 0) {
  		game = avaiableGames[0];

  	game.players.push(player.name);
  	websocket.emit('player-joined', {
			msg: 'Player joined!',
			gameID: game.id,
			game: game,
		});
  });
});