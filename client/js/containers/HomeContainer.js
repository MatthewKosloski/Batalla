import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import NewGame from '../components/NewGame';

import {
	REQUEST_GAME_ID, 
	RECEIVE_GAME_ID
} from '../../../common/constants/socketEvents';

class HomeContainer extends Component {

	constructor() {
		super();
		this.joinGame = this.joinGame.bind(this);
		this.handleNewGame = this.handleNewGame.bind(this);
		this.state = {
			creatingRoom: false
		}
	}

	componentDidMount() {
		const {socket} = this.props;
		socket.on(RECEIVE_GAME_ID, this.joinGame);
	}

	joinGame(gameId) {
		this.setState({creatingRoom: false});
		browserHistory.push(`/g/${gameId}`);
	}

	handleNewGame() {
		const {socket} = this.props;
		this.setState({creatingRoom: true});
		socket.emit(REQUEST_GAME_ID);
	}

	render() {
		const {creatingRoom} = this.state;
		return(
			<div>
				<h1>Batalla</h1>
				<p>A multiplayer battleship game built with Socket.io and React.  View the <a href="https://github.com/MatthewKosloski/Batalla">source</a>.</p>
				<NewGame onNewGame={this.handleNewGame} buttonText={creatingRoom ? 'Creating Room...' : 'New Game'}/>
			</div>	
		);
	}
}

export default HomeContainer;