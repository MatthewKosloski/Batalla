var socketEvents = require('../../common/constants/socketEvents');
var randomstring = require('randomstring');

var RECEIVE_GAME_ID = socketEvents.RECEIVE_GAME_ID,
	REQUEST_GAME_ID = socketEvents.REQUEST_GAME_ID,
	DISABLE_GAME = socketEvents.DISABLE_GAME,
	JOIN_GAME = socketEvents.JOIN_GAME,
	MESSAGE_FROM_SERVER = socketEvents.MESSAGE_FROM_SERVER,
	OPPONENT_LEFT = socketEvents.OPPONENT_LEFT,
	OPPONENT_JOINED = socketEvents.OPPONENT_JOINED,
	CONNECTION = 'connection',
	DISCONNECT = 'disconnect';

module.exports = function(io){
	io.on(CONNECTION, function (socket) {
	
		socket.on(REQUEST_GAME_ID, requestGameId);
		socket.on(JOIN_GAME, joinGame);

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
			var gameIsNotInProgress = clients === undefined || clients.length < 2;
			if(gameIsNotInProgress) {
				socket.join(gameId);
				socket.broadcast.emit(OPPONENT_JOINED);
			} else {
				socket.emit(DISABLE_GAME);
				socket.leave(gameId);
			}
			socket.on(DISCONNECT, function(){
				if(clients !== undefined) {
					if(clients.length === 1) {
						socket.broadcast.emit(OPPONENT_LEFT);
					}
				}
			});
		}
	});
}