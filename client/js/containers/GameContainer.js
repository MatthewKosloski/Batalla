import React, {Component} from 'react';
import {opponentArrived, opponentDeparted, disableGame} from '../actions';
import {connect} from 'react-redux';
import BoardsContainer from './BoardsContainer';

import {
	JOIN_GAME, 
	DISABLE_GAME, 
	MESSAGE_FROM_SERVER, 
	OPPONENT_JOINED, 
	OPPONENT_LEFT
} from '../../../common/constants/socketEvents';

class GameContainer extends Component {

	constructor() {
		super();
		this.handleDisableGame = this.handleDisableGame.bind(this);
		this.handleOpponentArrival = this.handleOpponentArrival.bind(this);
		this.handleOpponentDeparture = this.handleOpponentDeparture.bind(this);
	}

	componentDidMount() {
		const {socket, params} = this.props;
		socket.emit(JOIN_GAME, params.gameId);
		socket.on(MESSAGE_FROM_SERVER, this.displayMessage);
		socket.on(DISABLE_GAME, this.handleDisableGame);
		socket.on(OPPONENT_JOINED, this.handleOpponentArrival);
		socket.on(OPPONENT_LEFT, this.handleOpponentDeparture);
	}

	handleOpponentArrival() {
		const {dispatch} = this.props;
		dispatch(opponentArrived());
	}

	handleOpponentDeparture() {
		const {dispatch} = this.props;
		dispatch(opponentDeparted());
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
			playerGuesses, 
			socket,
			noOpponent,
			isWaitingForOpponent
		} = this.props;
		return(
			<div className="game-container">
				<p>Opponent Connected: {noOpponent ? 'false' : 'true'}</p>
				<p>Opponent Ready: {isWaitingForOpponent ? 'false' : 'true'}</p>
				{!gameDisabled ? 
					<BoardsContainer 
						ships={ships}
						busySquares={busySquares}
						dispatch={dispatch}
						playerGuesses={playerGuesses}
						socket={socket}
						isWaitingForOpponent={isWaitingForOpponent}
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
		playerGuesses,
		noOpponent,
		isWaitingForOpponent
	} = state;
	return {
		ships,
		busySquares,
		gameDisabled,
		playerGuesses,
		noOpponent,
		isWaitingForOpponent
	}
}

export default connect(mapStateToProps)(GameContainer);