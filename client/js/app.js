import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import configureStore, {history} from './store/configureStore';
import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';
import GameContainer from './containers/GameContainer';

const store = configureStore();

const router = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={AppContainer}>
				<IndexRoute component={HomeContainer}></IndexRoute>
				<Route path="/game/:gameId" component={GameContainer}></Route>
			</Route>
		</Router>
	</Provider>
);

render(router, document.getElementById('app'));