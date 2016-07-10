import React, {Component, PropTypes} from 'react';
import ClickableSquare from '../components/ClickableSquare';
import {haveSamePair, getIndexOfArray} from '../helpers';

class ClickableSquaresContainer extends Component {

	constructor() {
		super();
		this.renderSquare = this.renderSquare.bind(this);
	}

	renderSquare(i) {
		const { 
			playerGuesses,
			onSquareClick
		} = this.props;
		const x = i % 10;
		const y = Math.floor(i / 10);
		const playerGuessesArray = playerGuesses.map((i) => i.guess);
		const isBusy = haveSamePair([[x, y]], playerGuessesArray);
		let isHit = false;
		if(isBusy) {
			let i = getIndexOfArray([[x, y]], playerGuessesArray);
			isHit = playerGuesses[i].hit;
		}
		return (
			<ClickableSquare 
				key={i}
				x={x}
				y={y}
				isHit={isHit}
				isBusy={isBusy}
				onSquareClick={onSquareClick}
				playerGuesses={playerGuesses}
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

ClickableSquaresContainer.propTypes = {
	playerGuesses: PropTypes.arrayOf(PropTypes.object).isRequired,
	onSquareClick: PropTypes.func.isRequired
}

export default ClickableSquaresContainer;