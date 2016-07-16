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

		let headerTitle, headerDescription;
		const isWinning = shipsSunkByPlayer.length > shipsDestroyed.length;
		const isTie = shipsSunkByPlayer.length === shipsDestroyed.length

			if(noOpponent) {
				headerTitle = 'Opponent not connected';
				headerDescription = 'share the url with a friend to play';
			} else if(!noOpponent) {
				headerTitle = 'Opponent is not ready';
				headerDescription = 'the opponent is placing his ships';
			} else if(canMakeGuess) {
				headerTitle = 'Your turn';
				headerDescription = isWinning ? 'you\'re winning' : isTie ? 'good luck' : 'you\'re losing';
			} else if(!canMakeGuess) {
				headerTitle = 'Opponent\'s Turn';
				headerDescription = isWinning ? 'you\'re winning' : isTie ? 'good luck' : 'you\'re losing';
			}

		return(
			<div className="game">

				<main className="game__main">
					<header className="game__header">
						<div className="game__header-inner">
							<h1 className="game__header-title">{headerTitle}</h1>
							<p className="game__header-description">{headerDescription}</p>
						</div>
					</header>
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
				</main>
				<aside className="game__aside">
					<div className="game__aside-inner">
						Chatlog goes here!
					</div>
				</aside>

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