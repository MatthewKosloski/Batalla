import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import ships from './ships';
import busySquares from './busySquares';
import gameDisabled from './gameDisabled';

const rootReducer = combineReducers({
	routing: routerReducer,
	ships,
	busySquares,
	gameDisabled
});

export default rootReducer;