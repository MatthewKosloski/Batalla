import React, {Component, PropTypes} from 'react';
import DropTargetSquare from '../components/DropTargetSquare';
import {getIndexOfArray, haveSamePair} from '../helpers';

class DropTargetSquaresContainer extends Component {

	constructor() {
		super();
		this.renderSquare = this.renderSquare.bind(this);
	}

	renderSquare(i) {
		const { 
			busySquares, 
			canDragShips,
			opponentGuesses
		} = this.props;
		const x = i % 10;
		const y = Math.floor(i / 10);
		const isBusy = haveSamePair([[x, y]], busySquares);
		const isGuessed = haveSamePair([[x, y]], opponentGuesses);
		const isHit = isBusy && isGuessed ? true : false;
		return (
			<DropTargetSquare 
				key={i} 
				x={x} 
				y={y} 
				isBusy={isBusy}
				isGuessed={isGuessed}
				isHit={isHit}
				busySquares={busySquares}
				canDragShips={canDragShips}
			/>
		);
	}

	render() {
		const renderedSquares = [];
		for(let i = 0; i < 100; i++) {
			renderedSquares.push(this.renderSquare(i));
		}
		return(
			<div className="squares-container">
				{renderedSquares}
			</div>
		);
	}

}

DropTargetSquaresContainer.propTypes = {
	busySquares: PropTypes.arrayOf(PropTypes.array).isRequired,
	canDragShips: PropTypes.bool.isRequired
}

export default DropTargetSquaresContainer;