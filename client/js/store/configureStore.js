import {createStore, applyMiddleware} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const logger = createLogger();

export default function configureStore(preloadedState) {
	return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
}

export const history = syncHistoryWithStore(browserHistory, configureStore());
