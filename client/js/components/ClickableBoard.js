import React, {PropTypes} from 'react';
import OpponentShipsContainer from '../containers/OpponentShipsContainer';
import ClickableSquaresContainer from '../containers/ClickableSquaresContainer';

function ClickableBoard({playerGuesses, onSquareClick, shipsSunkByPlayer}) {
	return (
		<div className="board board--clickable">
			<OpponentShipsContainer 
				shipsSunkByPlayer={shipsSunkByPlayer}
			/>
			<ClickableSquaresContainer 
				playerGuesses={playerGuesses}
				onSquareClick={onSquareClick}
			/>
		</div>
	);
}

ClickableBoard.propTypes = {
	playerGuesses: PropTypes.arrayOf(PropTypes.object).isRequired,
	onSquareClick: PropTypes.func.isRequired,
	shipsSunkByPlayer: PropTypes.arrayOf(PropTypes.object).isRequired,
	dispatch: PropTypes.func.isRequired
}

export default ClickableBoard;