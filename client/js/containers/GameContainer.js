import React, {Component} from 'react';
import {connect} from 'react-redux';
import BoardsContainer from './BoardsContainer';

import {
	opponentArrived, 
	opponentDeparted, 
	disableGame, 
	canGuess
} from '../actions';

import {
	JOIN_GAME, 
	DISABLE_GAME, 
	MESSAGE_FROM_SERVER, 
	OPPONENT_LEFT,
	ALL_CLIENTS_CONNECTED,
	CAN_GUESS
} from '../../../common/constants/socketEvents';

class GameContainer extends Component {

	constructor() {
		super();
		this.handleDisableGame = this.handleDisableGame.bind(this);
		this.handleOpponentArrival = this.handleOpponentArrival.bind(this);
		this.handleOpponentDeparture = this.handleOpponentDeparture.bind(this);
		this.handleCanGuess = this.handleCanGuess.bind(this);
		this.getShipsByType = this.getShipsByType.bind(this);
	}

	componentDidMount() {
		const {socket, params} = this.props;
		socket.emit(JOIN_GAME, params.gameId);
		socket.on(MESSAGE_FROM_SERVER, this.displayMessage);
		socket.on(DISABLE_GAME, this.handleDisableGame);
		socket.on(ALL_CLIENTS_CONNECTED, this.handleOpponentArrival);
		socket.on(OPPONENT_LEFT, this.handleOpponentDeparture);
		socket.on(CAN_GUESS, this.handleCanGuess);
	}

	getShipsByType([...types]) {
		const {ships} = this.props;
		return [...types].map((type) => ships.filter((ship) => ship.type === type)[0]);
	}

	handleCanGuess() {
		const {dispatch} = this.props;
		dispatch(canGuess(true));
	}

	handleOpponentArrival() {
		const {dispatch} = this.props;
		dispatch(opponentArrived());
	}

	handleOpponentDeparture() {
		const {dispatch} = this.props;
		dispatch(opponentDeparted());
		console.log('OPPONENT_LEFT');
	}

	handleDisableGame() {
		const {dispatch} = this.props;
		dispatch(disableGame());
	}

	displayMessage(data) {
		console.log(data);
	}

	render() {
		const {
			gameDisabled, 
			ships, 
			busySquares, 
			dispatch, 
			socket,
			noOpponent,
			isWaitingForOpponent,
			params,
			canMakeGuess,
			canDragShips, 
			opponentGuesses,
			playerGuesses,
			shipsDestroyed,
			shipsSunkByPlayer,
			isWinner
		} = this.props;
		return(
			<div className="game-container">
				<p>Opponent Connected: {noOpponent ? 'false' : 'true'}</p>
				<p>Opponent Ready: {isWaitingForOpponent ? 'false' : 'true'}</p>
				<p>{canMakeGuess ? 'Your Turn!' : 'Opponent\'s Turn!'}</p>
				{!gameDisabled ? 
					<BoardsContainer 
						ships={ships}
						busySquares={busySquares}
						dispatch={dispatch}
						socket={socket}
						isWaitingForOpponent={isWaitingForOpponent}
						params={params}
						canMakeGuess={canMakeGuess}
						noOpponent={noOpponent}
						canDragShips={canDragShips}
						opponentGuesses={opponentGuesses}
						playerGuesses={playerGuesses}
						shipsDestroyed={shipsDestroyed}
						shipsSunkByPlayer={shipsSunkByPlayer}
						getShipsByType={this.getShipsByType}
						isWinner={isWinner}
					/> : <p>This game is currently in progress.</p>}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {
		ships, 
		busySquares, 
		gameDisabled, 
		noOpponent,
		isWaitingForOpponent,
		canMakeGuess,
		canDragShips, 
		opponentGuesses,
		playerGuesses,
		shipsDestroyed,
		shipsSunkByPlayer,
		isWinner
	} = state;
	return {
		ships,
		busySquares,
		gameDisabled,
		noOpponent,
		isWaitingForOpponent,
		canMakeGuess,
		canDragShips, 
		opponentGuesses,
		playerGuesses,
		shipsDestroyed,
		shipsSunkByPlayer,
		isWinner
	}
}

export default connect(mapStateToProps)(GameContainer);