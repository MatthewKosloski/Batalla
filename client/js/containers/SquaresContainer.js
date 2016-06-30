import React, {Component, PropTypes} from 'react';
import Square from '../components/Square';
import {haveSamePair} from '../helpers';

class SquaresContainer extends Component {

	constructor() {
		super();
		this.renderSquare = this.renderSquare.bind(this);
	}

	renderSquare(i) {
		const {ships, busySquares} = this.props;
		const x = i % 10;
		const y = Math.floor(i / 10);
		const isBusy = haveSamePair([[x, y]], busySquares);
		return (
			<Square 
				key={i} 
				x={x} 
				y={y} 
				isBusy={isBusy}
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
	ships: PropTypes.arrayOf(PropTypes.object).isRequired,
	busySquares: PropTypes.arrayOf(PropTypes.array).isRequired
}

export default SquaresContainer;