import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import ships from './ships';
import busySquares from './busySquares';
import gameDisabled from './gameDisabled';
import playerGuesses from './playerGuesses';
import canDragShips from './canDragShips';
import noOpponent from './noOpponent';
import isWaitingForOpponent from './isWaitingForOpponent';

const rootReducer = combineReducers({
	routing: routerReducer,
	ships,
	busySquares,
	gameDisabled,
	playerGuesses,
	canDragShips,
	noOpponent,
	isWaitingForOpponent
});

export default rootReducer;