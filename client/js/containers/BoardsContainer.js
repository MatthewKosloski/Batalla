import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ClickableBoard from '../components/ClickableBoard';
import DraggableBoard from '../components/DraggableBoard';
import {disableDragging} from '../actions';

class BoardsContainer extends Component {

	constructor() {
		super();
		this.handlePlayerGuess = this.handlePlayerGuess.bind(this);
		this.handlePlayerReady = this.handlePlayerReady.bind(this);
	}

	handlePlayerReady() {
		const {dispatch} = this.props;
		dispatch(disableDragging());
	}

	handlePlayerGuess(x, y) {
		console.log('You guessed', `${x},${y}`);
	}

	render() {
		const {
			ships, 
			busySquares, 
			dispatch, 
			playerGuesses,
			canDragShips,
			isWaitingForOpponent
		} = this.props;
		return (
			<div className="boards">
				<div className="board__container">
					<h2>Your Board</h2>
					<DraggableBoard 
						ships={ships}
						busySquares={busySquares}
						canDragShips={canDragShips}
						dispatch={dispatch}
					/>
					<button onClick={this.handlePlayerReady} disabled={!canDragShips}>Ready</button>
				</div>
				<div className="board__container">
					<h2>Opponent's Board</h2>
					<ClickableBoard 
						busySquares={playerGuesses}
						dispatch={dispatch}
						onSquareClick={this.handlePlayerGuess}
					/>
				</div>
			</div>
		);
	}

}

BoardsContainer.propTypes = {
	ships: PropTypes.arrayOf(PropTypes.object).isRequired,
	busySquares: PropTypes.arrayOf(PropTypes.array).isRequired,
	playerGuesses: PropTypes.arrayOf(PropTypes.array).isRequired,
	socket: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const {canDragShips} = state;
	return {
		canDragShips
	}
}

export default connect(mapStateToProps)(BoardsContainer);