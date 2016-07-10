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
	shipsSunkByPlayer
});

export default rootReducer;