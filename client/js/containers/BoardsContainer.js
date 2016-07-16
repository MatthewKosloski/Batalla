import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ClickableBoard from '../components/ClickableBoard';
import DraggableBoard from '../components/DraggableBoard';
import shipsSchema from '../data/shipsSchema';

import {
	getIndexOfArray, 
	haveSamePair, 
	generateCoordinatesForShips
} from '../helpers';

import {
	disableDragging,
	opponentReady,
	canGuess,
	addOpponentGuess,
	addPlayerGuess,
	addSunkenShip,
	setWinnerStatus,
	changeOrientation
} from '../actions';

import {
	PLAYER_READY,
	OPPONENT_READY,
	SEND_GUESS,
	RECEIVE_GUESS,
	SEND_GUESS_FEEDBACK,
	RECEIVE_GUESS_FEEDBACK,
	OPPONENT_SHIP_DESTROYED,
	RECEIVE_DESTROYED_SHIP,
	OPPONENT_HAS_WON,
	PLAYER_HAS_WON
} from '../../../common/constants/socketEvents';

class BoardsContainer extends Component {

	constructor() {
		super();
		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
		this.handlePlayerGuess = this.handlePlayerGuess.bind(this);
		this.handlePlayerReady = this.handlePlayerReady.bind(this);
		this.handleOpponentReady = this.handleOpponentReady.bind(this);
		this.handleReceivedGuess = this.handleReceivedGuess.bind(this);
		this.handleReceivedGuessFeedback = this.handleReceivedGuessFeedback.bind(this);
		this.handleReceiveDestroyedShip = this.handleReceiveDestroyedShip.bind(this);
		this.handlePlayerHasWon = this.handlePlayerHasWon.bind(this);
		this.handleShuffleShips = this.handleShuffleShips.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const {
			socket, 
			params, 
			dispatch, 
			ships, 
			getShipsByType, 
			shipsDestroyed: oldShipsDestroyed
		} = this.props;
		const {shipsDestroyed: nextShipsDestroyed} = nextProps;
		if(oldShipsDestroyed.length !== nextShipsDestroyed.length) {
			const destroyedShipType = nextShipsDestroyed.filter((x) => oldShipsDestroyed.indexOf(x) === -1);
			const destroyedShip = getShipsByType(destroyedShipType)[0];
			console.log(destroyedShipType, destroyedShip);
			const {coordinates, orientation} = destroyedShip;
			const {gameId} = params;
			console.log(`Your ${destroyedShipType} has been destroyed.`, coordinates);
			socket.emit(OPPONENT_SHIP_DESTROYED, {
				destroyedShipType,
				coordinates,
				orientation, 
				gameId
			});
			if(ships.length && nextShipsDestroyed.length === ships.length) {
				const {gameId} = params;
				console.log('You lost!');
				dispatch(setWinnerStatus(false));
				socket.emit(OPPONENT_HAS_WON, gameId);
			}
		}
	}

	componentDidMount() {
		const {socket} = this.props;
		socket.on(OPPONENT_READY, this.handleOpponentReady);
		socket.on(RECEIVE_GUESS, this.handleReceivedGuess);
		socket.on(RECEIVE_GUESS_FEEDBACK, this.handleReceivedGuessFeedback);
		socket.on(RECEIVE_DESTROYED_SHIP, this.handleReceiveDestroyedShip);
		socket.on(PLAYER_HAS_WON, this.handlePlayerHasWon);
	}

	handleShuffleShips() {
		const {dispatch} = this.props;
		let newShips = generateCoordinatesForShips(shipsSchema);
		for(let i = 0; i < newShips.length; i++) {
			let ship = newShips[i];
			let {type, orientation, coordinates} = ship;
			dispatch(changeOrientation(type, orientation, coordinates, true));
		}
	}

	handlePlayerHasWon() {
		const {dispatch} = this.props;
		dispatch(setWinnerStatus(true));
		console.log('You won!');
	}

	handleReceiveDestroyedShip(data) {
		const {dispatch} = this.props;
		const {type, coordinates, orientation} = data;
		console.log(`You destroyed the ${type} at`, coordinates);
		dispatch(addSunkenShip(type, coordinates, orientation));
	}

	handleReceivedGuessFeedback(data) {
		const {dispatch} = this.props;
		const {guess, hit} = data;
		dispatch(addPlayerGuess(guess, hit));
	}

	handleReceivedGuess(guess) {
		const {
			dispatch, 
			socket, 
			busySquares, 
			params, 
			ships, 
			opponentGuesses, 
			shipsDestroyed
		} = this.props;
		const {gameId} = params;
		const hit = getIndexOfArray([guess], busySquares) !== -1 ? true : false;
		dispatch(addOpponentGuess(guess));
		socket.emit(SEND_GUESS_FEEDBACK, {guess, hit, gameId});
	}

	handleOpponentReady() {
		const {dispatch, noOpponent} = this.props;
		dispatch(opponentReady());
	}

	handlePlayerReady() {
		const {dispatch, socket, params} = this.props;
		dispatch(disableDragging());
		socket.emit(PLAYER_READY, params.gameId);
	}

	handlePlayerGuess(x, y) {
		const {
			noOpponent, 
			isWaitingForOpponent, 
			canMakeGuess, 
			socket,
			params,
			dispatch,
			playerGuesses,
			isWinner
		} = this.props;
		const isBusy = haveSamePair([[x, y]], playerGuesses.map((i) => i.guess));
		if(!noOpponent && !isWaitingForOpponent && canMakeGuess && !isBusy && isWinner === null) {
			socket.emit(SEND_GUESS, {
				gameId: params.gameId, 
				square: [x, y]
			});
			dispatch(canGuess(false));
		}
	}

	render() {
		const {
			ships, 
			busySquares, 
			dispatch, 
			opponentGuesses,
			playerGuesses,
			canDragShips,
			isWaitingForOpponent,
			noOpponent,
			shipsSunkByPlayer,
			getShipsByType,
			shipsDestroyed
		} = this.props;
		return (
			<div className="game__boards">
				<div className="game__board board--player">
					<div className="game__board-inner">
						<DraggableBoard 
						opponentGuesses={opponentGuesses}
						ships={ships}
						busySquares={busySquares}
						canDragShips={canDragShips}
						dispatch={dispatch}
						getShipsByType={getShipsByType}
						shipsDestroyed={shipsDestroyed}
					/>
					<button onClick={this.handleShuffleShips}>Shuffle</button>
					<button onClick={this.handlePlayerReady} disabled={!canDragShips||noOpponent}>Ready</button>
					</div>
				</div>
				<div className="game__board board--opponent">
					<div className="game__board-inner">
						<ClickableBoard 
							shipsSunkByPlayer={shipsSunkByPlayer}
							playerGuesses={playerGuesses}
							dispatch={dispatch}
							onSquareClick={this.handlePlayerGuess}
						/>
					</div>
				</div>
			</div>
		);
	}
}

BoardsContainer.propTypes = {
	ships: PropTypes.arrayOf(PropTypes.object).isRequired,
	busySquares: PropTypes.arrayOf(PropTypes.array).isRequired,
	dispatch: PropTypes.func.isRequired,
	socket: PropTypes.object.isRequired,
	isWaitingForOpponent: PropTypes.bool.isRequired,
	params: PropTypes.object.isRequired,
	canMakeGuess: PropTypes.bool.isRequired,
	noOpponent: PropTypes.bool.isRequired,
	canDragShips: PropTypes.bool.isRequired,
	opponentGuesses: PropTypes.arrayOf(PropTypes.array).isRequired,
	playerGuesses: PropTypes.array.isRequired,
	shipsDestroyed: PropTypes.array.isRequired,
	shipsSunkByPlayer: PropTypes.arrayOf(PropTypes.object).isRequired,
	getShipsByType: PropTypes.func.isRequired
}

export default BoardsContainer;