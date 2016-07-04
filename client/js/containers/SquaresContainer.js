import React, {Component, PropTypes} from 'react';
import DropTargetSquare from '../components/DropTargetSquare';
import ClickableSquare from '../components/ClickableSquare';
import {haveSamePair} from '../helpers';

class SquaresContainer extends Component {

	constructor() {
		super();
		this.renderSquare = this.renderSquare.bind(this);
	}

	renderSquare(i) {
		const {isDropTarget, busySquares, onSquareClick, canDragShips} = this.props;
		const x = i % 10;
		const y = Math.floor(i / 10);
		const isBusy = haveSamePair([[x, y]], busySquares);
		return (
			isDropTarget ? 
				<DropTargetSquare 
					key={i} 
					x={x} 
					y={y} 
					isBusy={isBusy}
					busySquares={busySquares}
					canDragShips={canDragShips}
				/>
			:
				<ClickableSquare 
					key={i}
					x={x}
					y={y}
					isBusy={isBusy}
					onSquareClick={onSquareClick}
					busySquares={busySquares}
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

SquaresContainer.propTypes = {
	busySquares: PropTypes.arrayOf(PropTypes.array).isRequired,
	isDropTarget: PropTypes.bool.isRequired,
	onSquareClick: PropTypes.func,
	canDragShips: PropTypes.bool
}

export default SquaresContainer;