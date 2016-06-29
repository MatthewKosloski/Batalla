import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import configureStore, {history} from './store/configureStore';

import Main from './containers/Main';
import Board from './containers/Board';

const store = configureStore();

const router = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={Board}></IndexRoute>
			</Route>
		</Router>
	</Provider>
);

render(router, document.getElementById('app'));