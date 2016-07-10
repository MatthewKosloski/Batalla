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
		let className = 'board__square';
		let style = {};
		if(isOver && canDrop) style.backgroundColor = 'rgba(0, 255, 0, 0.33)';
		if(!isHit && isGuessed) style.backgroundColor = 'rgba(255, 255, 0, 0.33)';
		if(isHit && isBusy) style.backgroundColor = 'rgba(255, 0, 0, 0.33)';
		return connectDropTarget(
			<div 
				className={className} 
				onMouseOver={onSquareHover} 
				style={style}>
				{x}, {y}
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