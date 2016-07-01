import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import NewGame from '../components/NewGame';
import {REQUEST_GAME_ID, RECEIVE_GAME_ID} from '../../../common/constants/socketEvents';

class HomeContainer extends Component {

	constructor() {
		super();
		this.handleNewGame = this.handleNewGame.bind(this);
	}

	componentDidMount() {
		const {socket} = this.props;
		socket.on(RECEIVE_GAME_ID, this.joinGame);
	}

	joinGame(gameId) {
		browserHistory.push(`/game/${gameId}`);
	}

	handleNewGame() {
		const {socket} = this.props;
		socket.emit(REQUEST_GAME_ID);
	}

	render() {
		return(
			<div>
				<h1>Batalla</h1>
				<p>A multiplayer battleship game built with Socket.io and React.  View the <a href="https://github.com/MatthewKosloski/Batalla">source</a>.</p>
				<NewGame onNewGame={this.handleNewGame} text="New Game"/>
			</div>	
		);
	}
}

export default HomeContainer;