import React, {PropTypes} from 'react';

function ClickableSquare({x, y, onSquareClick}) {
	return <div className="board__square" onClick={onSquareClick.bind(null, x, y)}>{x}, {y}</div>
}

ClickableSquare.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	onSquareClick: PropTypes.func.isRequired
}

export default ClickableSquare;