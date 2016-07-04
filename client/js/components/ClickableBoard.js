import React, {PropTypes} from 'react';
import SquaresContainer from '../containers/SquaresContainer';

function ClickableBoard({busySquares, onSquareClick}) {
	return (
		<div className="board board--clickable">
			<SquaresContainer 
				busySquares={busySquares}
				onSquareClick={onSquareClick}
				isDropTarget={false}
			/>
		</div>
	);
}

ClickableBoard.propTypes = {
	busySquares: PropTypes.arrayOf(PropTypes.array).isRequired,
	onSquareClick: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired
}

export default ClickableBoard;