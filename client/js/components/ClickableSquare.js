import React, {Component, PropTypes} from 'react';
import {getIndexOfArray} from '../helpers';

class ClickableSquare extends Component {
	render() {
		const {x, y, onSquareClick, playerGuesses, isBusy, isHit} = this.props;
		let boardSquareClass = 'board__square';
		if(!isHit && isBusy) boardSquareClass += ' miss';
		if(isHit && isBusy) boardSquareClass += ' hit';
		return (
			<div 
				className={boardSquareClass} 
				onClick={onSquareClick.bind(null, x, y)}>
				<div className="board__square-dot dot--light-blue"></div>
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