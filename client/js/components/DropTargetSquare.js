import React, {Component, PropTypes} from 'react';
import {DRAGGABLE_SHIP} from '../constants/ships';
import {haveSamePair} from '../helpers';
import {DropTarget} from 'react-dnd';

const squareTarget = {
	canDrop(props) {
		const {isBusy, canDragShips} = props;
		if(isBusy || !canDragShips) {
			return false;
		} else {
			return true;
		}
	},
	drop(props) {
		const {x, y} = props;
		return {
			dropLocationX: x,
			dropLocationY: y
		};
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	};
}

class DropTargetSquare extends Component {
	render() {
		const {
			x, 
			y,
			onSquareHover, 
			connectDropTarget, 
			isOver, 
			canDrop, 
			isHit, 
			isBusy,
			isGuessed
		} = this.props;
		let boardSquareClass = 'board__square';
		if(isOver && canDrop) boardSquareClass += ' is-over';
		if(!isHit && isGuessed) boardSquareClass += ' miss';
		if(isHit && isBusy) boardSquareClass += ' hit';
		return connectDropTarget(
			<div 
				className={boardSquareClass} 
				onMouseOver={onSquareHover}>
				<div className="board__square-dot dot--dark-blue"></div>
			</div>
		);
	}
}

DropTargetSquare.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	isBusy: PropTypes.bool.isRequired,
	busySquares: PropTypes.arrayOf(PropTypes.array).isRequired,
	canDragShips: PropTypes.bool.isRequired
}

export default DropTarget(DRAGGABLE_SHIP, squareTarget, collect)(DropTargetSquare);