var socketEvents = require('../../common/constants/socketEvents');
var randomstring = require('randomstring');

var RECEIVE_GAME_ID = socketEvents.RECEIVE_GAME_ID,
	REQUEST_GAME_ID = socketEvents.REQUEST_GAME_ID,
	DISABLE_GAME = socketEvents.DISABLE_GAME,
	JOIN_GAME = socketEvents.JOIN_GAME,
	OPPONENT_LEFT = socketEvents.OPPONENT_LEFT,
	ALL_CLIENTS_CONNECTED = socketEvents.ALL_CLIENTS_CONNECTED,
	PLAYER_READY = socketEvents.PLAYER_READY,
	OPPONENT_READY = socketEvents.OPPONENT_READY,
	CAN_GUESS = socketEvents.CAN_GUESS,
	SEND_GUESS = socketEvents.SEND_GUESS,
	RECEIVE_GUESS = socketEvents.RECEIVE_GUESS,
	SEND_GUESS_FEEDBACK = socketEvents.SEND_GUESS_FEEDBACK,
	RECEIVE_GUESS_FEEDBACK = socketEvents.RECEIVE_GUESS_FEEDBACK,
	OPPONENT_SHIP_DESTROYED = socketEvents.OPPONENT_SHIP_DESTROYED,
	RECEIVE_DESTROYED_SHIP = socketEvents.RECEIVE_DESTROYED_SHIP,
	OPPONENT_HAS_WON = socketEvents.OPPONENT_HAS_WON,
	PLAYER_HAS_WON = socketEvents.PLAYER_HAS_WON,
	SEND_MESSAGE = socketEvents.SEND_MESSAGE,
	RECEIVE_MESSAGE = socketEvents.RECEIVE_MESSAGE;

module.exports = function(io){
	io.on('connection', function (socket) {
	
		socket.on(REQUEST_GAME_ID, handleRequestGameId);
		socket.on(JOIN_GAME, handleJoinGame);
		socket.on(PLAYER_READY, handlePlayerReady);
		socket.on(SEND_GUESS, handleSendGuess);
		socket.on(SEND_GUESS_FEEDBACK, handleSendGuessFeedback);
		socket.on(OPPONENT_SHIP_DESTROYED, handleOpponentShipDestroyed);
		socket.on(OPPONENT_HAS_WON, handleOpponentWinning);
		socket.on(SEND_MESSAGE, handleReceivedMessage);

		function handleReceivedMessage(message) {
			socket.broadcast.to(message.gameId).emit(RECEIVE_MESSAGE, {
				type: message.type,
				time: message.time,
				text: message.text
			});
		}

		function handleOpponentWinning(gameId) {
			socket.broadcast.to(gameId).emit(PLAYER_HAS_WON);
		}

		function handleOpponentShipDestroyed(data) {
			socket.broadcast.to(data.gameId).emit(RECEIVE_DESTROYED_SHIP, {
				type: data.destroyedShipType[0],
				coordinates: data.coordinates,
				orientation: data.orientation
			});
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
			socket.on('disconnect', function(){
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