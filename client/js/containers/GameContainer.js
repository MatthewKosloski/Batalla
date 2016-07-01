import React, {Component} from 'react';
import {JOIN_GAME, DISABLE_GAME, MESSAGE_FROM_SERVER} from '../../../common/constants/socketEvents';
import {disableGame} from '../actions';
import {connect} from 'react-redux';
import DraggableBoard from '../components/DraggableBoard';

class GameContainer extends Component {

	constructor() {
		super();
		this.handleDisableGame = this.handleDisableGame.bind(this);
	}

	componentDidMount() {
		const {socket, params} = this.props;
		socket.emit(JOIN_GAME, params.gameId);
		socket.on(MESSAGE_FROM_SERVER, this.displayMessage);
		socket.on(DISABLE_GAME, this.handleDisableGame);
	}

	handleDisableGame() {
		const {dispatch} = this.props;
		dispatch(disableGame());
	}

	displayMessage(data) {
		console.log(data);
	}

	render() {

		const {gameDisabled} = this.props;

		return(
			<div>
				<div style={{display: gameDisabled ? 'none' : 'block'}}>
					<h1>Game container</h1>
					<p>Game boards will go here...</p>
				</div>
				<div style={{display: gameDisabled ? 'block' : 'none'}}>
					<p>This game is currently in progress.</p>
				</div>	
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {ships, busySquares, gameDisabled} = state;
	return {
		ships,
		busySquares,
		gameDisabled
	}
}

export default connect(mapStateToProps)(GameContainer);