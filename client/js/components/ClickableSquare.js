import React, {Component, PropTypes} from 'react';
import {getIndexOfArray} from '../helpers';

class ClickableSquare extends Component {
	render() {
		const {x, y, onSquareClick, playerGuesses, isBusy, isHit} = this.props;
		let style = {};
		if(!isHit && isBusy) style.backgroundColor = 'rgba(255, 255, 0, 0.33)';
		if(isHit && isBusy) style.backgroundColor = 'rgba(255, 0, 0, 0.33)';
		return (
			<div 
				className="board__square" 
				onClick={onSquareClick.bind(null, x, y)}
				style={style}>
					{x}, {y}
			</div>
		);
	}
}

ClickableSquare.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	isBusy: PropTypes.bool.isRequired,
	onSquareClick: PropTypes.func.isRequired
}

export default ClickableSquare;