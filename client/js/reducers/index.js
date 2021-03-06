import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import ships from './ships';
import busySquares from './busySquares';
import gameDisabled from './gameDisabled';
import opponentGuesses from './opponentGuesses';
import canDragShips from './canDragShips';
import noOpponent from './noOpponent';
import isWaitingForOpponent from './isWaitingForOpponent';
import canMakeGuess from './canMakeGuess';
import playerGuesses from './playerGuesses';
import shipsDestroyed from './shipsDestroyed';
import shipsSunkByPlayer from './shipsSunkByPlayer';
import isWinner from './isWinner';
import isCreatingRoom from './isCreatingRoom';
import isReady from './isReady';
import messages from './messages';
import modal from './modal';

const rootReducer = combineReducers({
	routing: routerReducer,
	ships,
	busySquares,
	gameDisabled,
	opponentGuesses,
	canDragShips,
	noOpponent,
	isWaitingForOpponent,
	canMakeGuess,
	playerGuesses,
	shipsDestroyed,
	shipsSunkByPlayer,
	isWinner,
	isCreatingRoom,
	isReady,
	messages,
	modal
});

export default rootReducer;