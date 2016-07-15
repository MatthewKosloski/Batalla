import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import NewGame from '../components/NewGame';
import {setCreatingRoom} from '../actions';

import {
	REQUEST_GAME_ID, 
	RECEIVE_GAME_ID
} from '../../../common/constants/socketEvents';

class HomeContainer extends Component {

	constructor() {
		super();
		this.joinGame = this.joinGame.bind(this);
		this.handleNewGame = this.handleNewGame.bind(this);
	}

	componentDidMount() {
		const {socket} = this.props;
		socket.on(RECEIVE_GAME_ID, this.joinGame);
	}

	joinGame(gameId) {
		const {dispatch} = this.props;
		dispatch(setCreatingRoom(false));
		browserHistory.push(`/g/${gameId}`);
	}

	handleNewGame() {
		const {socket, dispatch} = this.props;
		dispatch(setCreatingRoom(true));
		socket.emit(REQUEST_GAME_ID);
	}

	render() {
		const {isCreatingRoom} = this.props;
		return(
			<div className="landing">
				<div className="landing__top">
					<div className="landing__top-inner">
						<h1 className="landing__title">Batalla</h1>
						<p className="landing__description">A multiplayer battleship game built with <a href="http://socket.io/">Socket.io</a> and <a href="https://facebook.github.io/react/">React</a>.</p>
						<NewGame className="landing__btn btn btn--dark-blue" onNewGame={this.handleNewGame} buttonText={isCreatingRoom ? 'Creating Room...' : 'New Game'} />
					</div>
				</div>
				<div className="landing__bottom">
					<p>Made by <a href="http://mtk.me/">Matthew Kosloski</a>.  View the <a href="https://github.com/MatthewKosloski/Batalla">source</a>.</p>
				</div>
			</div>	
		);
	}
}

function mapStateToProps(state) {
	const {isCreatingRoom} = state;
	return {
		isCreatingRoom
	}
}

export default connect(mapStateToProps)(HomeContainer);