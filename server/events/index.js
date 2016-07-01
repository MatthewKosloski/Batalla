var socketEvents = require('../../common/constants/socketEvents');
var randomstring = require('randomstring');

var RECEIVE_GAME_ID = socketEvents.RECEIVE_GAME_ID,
	REQUEST_GAME_ID = socketEvents.REQUEST_GAME_ID,
	DISABLE_GAME = socketEvents.DISABLE_GAME,
	JOIN_GAME = socketEvents.JOIN_GAME,
	MESSAGE_FROM_SERVER = socketEvents.MESSAGE_FROM_SERVER,
	DISCONNECT = 'disconnect';

module.exports = function(io){
	io.on('connection', function (socket) {
	
		socket.on(REQUEST_GAME_ID, requestGameId);
		socket.on(JOIN_GAME, joinGame);
		socket.on(DISCONNECT, disconnect);

		function _generateString() { 
			return randomstring.generate({length: 4, readable: true});
		}

		function requestGameId() {
			var gameId = _generateString();
			while(true) {
				if(Object.keys(io.sockets.adapter.rooms).indexOf(gameId) > -1) {
					gameId = _generateString();
				} else {
					socket.emit(RECEIVE_GAME_ID, gameId);
					break;
				}
			}
		}

		function joinGame(gameId) {
			var clients = io.sockets.adapter.rooms[gameId];
			if(clients === undefined || clients.length < 2) {
				socket.join(gameId);
				console.log(socket.id + ' joined ' + gameId);
				socket.emit(MESSAGE_FROM_SERVER, {data: 'You are connected.'});
			} else {
				socket.emit(DISABLE_GAME);
				socket.leave(gameId);
				console.log(socket.id + ' was removed from ' + gameId);
			}
		}

		function disconnect() {
			console.log(socket.id + ' disconnected');
		}
	});
}