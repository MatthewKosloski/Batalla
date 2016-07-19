import React, {Component} from 'react';
import {connect} from 'react-redux';
import GameHeader from '../components/GameHeader';
import ModalContainer from './ModalContainer';
import BoardsContainer from './BoardsContainer';
import ChatContainer from './ChatContainer';

import {
	opponentArrived, 
	opponentDeparted, 
	disableGame, 
	canGuess
} from '../actions';

import {
	JOIN_GAME, 
	DISABLE_GAME, 
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
	}

	handleDisableGame() {
		const {dispatch} = this.props;
		dispatch(disableGame());
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
			isWinner,
			isReady,
			messages,
			modal
		} = this.props;

		return(
			<div>
				<ModalContainer 
					modal={modal} 
				/>
				<div className="game">
					<main className="game__main">
						<GameHeader 
							isReady={isReady}
							noOpponent={noOpponent}
							isWaitingForOpponent={isWaitingForOpponent}
							canMakeGuess={canMakeGuess}
							isWinning={shipsSunkByPlayer.length > shipsDestroyed.length}
							isTie={shipsSunkByPlayer.length === shipsDestroyed.length}
						/>
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
							isReady={isReady}
						/>
					</main>
					<aside className="game__aside">
						<ChatContainer 
							socket={socket}
							dispatch={dispatch}
							messages={messages}
							gameId={params.gameId}
							canChat={!noOpponent}
						/>
					</aside>

				</div>
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
		isWinner,
		isReady,
		messages,
		modal
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
		isWinner,
		isReady,
		messages,
		modal
	}
}

export default connect(mapStateToProps)(GameContainer);