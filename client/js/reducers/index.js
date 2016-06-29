import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import ships from './ships';
import busySquares from './busySquares';

const rootReducer = combineReducers({
	routing: routerReducer,
	ships,
	busySquares
});

export default rootReducer;