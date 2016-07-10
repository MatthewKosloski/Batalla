var socketEvents = require('../../common/constants/socketEvents');
var randomstring = require('randomstring');

var RECEIVE_GAME_ID = socketEvents.RECEIVE_GAME_ID,
	REQUEST_GAME_ID = socketEvents.REQUEST_GAME_ID,
	DISABLE_GAME = socketEvents.DISABLE_GAME,
	JOIN_GAME = socketEvents.JOIN_GAME,
	MESSAGE_FROM_SERVER = socketEvents.MESSAGE_FROM_SERVER,
	OPPONENT_LEFT = socketEvents.OPPONENT_LEFT,
	ALL_CLIENTS_CONNECTED = socketEvents.ALL_CLIENTS_CONNECTED,
	PLAYER_READY = socketEvents.PLAYER_READY,
	OPPONENT_READY = socketEvents.OPPONENT_READY,
	CAN_GUESS = socketEvents.CAN_GUESS,
	SEND_GUESS = socketEvents.SEND_GUESS,
	RECEIVE_GUESS = socketEvents.RECEIVE_GUESS,
	SEND_GUESS_FEEDBACK = socketEvents.SEND_GUESS_FEEDBACK,
	RECEIVE_GUESS_FEEDBACK = socketEvents.RECEIVE_GUESS_FEEDBACK,
	SEND_DESTROYED_SHIPS = socketEvents.SEND_DESTROYED_SHIPS,
	OPPONENT_SHIP_DESTROYED = socketEvents.OPPONENT_SHIP_DESTROYED,
	RECEIVE_DESTROYED_SHIP = socketEvents.RECEIVE_DESTROYED_SHIP
	CONNECTION = 'connection',
	DISCONNECT = 'disconnect';

module.exports = function(io){
	io.on(CONNECTION, function (socket) {
	
		socket.on(REQUEST_GAME_ID, handleRequestGameId);
		socket.on(JOIN_GAME, handleJoinGame);
		socket.on(PLAYER_READY, handlePlayerReady);
		socket.on(SEND_GUESS, handleSendGuess);
		socket.on(SEND_GUESS_FEEDBACK, handleSendGuessFeedback);
		socket.on(SEND_DESTROYED_SHIPS, handleSendDestroyedShips);
		socket.on(OPPONENT_SHIP_DESTROYED, handleOpponentShipDestroyed);

		function handleOpponentShipDestroyed(data) {
			socket.broadcast.to(data.gameId).emit(RECEIVE_DESTROYED_SHIP, {
				destroyedShip: data.destroyedShip,
				destroyedShipCoordinates: data.destroyedShipCoordinates
			});
		}

		function handleSendDestroyedShips(payload) {
			console.log(payload);
		}

		function handleSendGuessFeedback(payload) {
			socket.broadcast.to(payload.gameId).emit(RECEIVE_GUESS_FEEDBACK, {
				guess: payload.guess, 
				hit: payload.hit
			});
		}

		function handleSendGuess(payload) {
			socket.broadcast.to(payload.gameId).emit(RECEIVE_GUESS, payload.square);
		}

		function handlePlayerReady(gameId) {
			socket.broadcast.to(gameId).emit(OPPONENT_READY);
		}

		function handleJoinGame(gameId) {
			var clients = io.sockets.adapter.rooms[gameId];
			var clientsExist = clients !== undefined;
			var clientsDontExist = clients === undefined;
			var gameIsNotInProgress = clientsDontExist || clients.length < 2;
			var gameHasOnePlayer = clientsExist && clients.length === 1;
			if(gameIsNotInProgress) {
				socket.join(gameId);
			} else {
				socket.emit(DISABLE_GAME);
				socket.leave(gameId);
			}
			if(clientsDontExist) {
				socket.emit(CAN_GUESS);
			}
			if(gameHasOnePlayer) {
				io.in(gameId).emit(ALL_CLIENTS_CONNECTED);
			}
			socket.on(DISCONNECT, function(){
				socket.broadcast.to(gameId).emit(OPPONENT_LEFT);
			});
		}

		function _generateString() { 
			return randomstring.generate({length: 4, readable: true});
		}

		function handleRequestGameId() {
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

	});
}