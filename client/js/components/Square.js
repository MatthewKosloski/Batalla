import React, {Component, PropTypes} from 'react';
import {DRAGGABLE_SHIP} from '../constants/ships';
import {DropTarget} from 'react-dnd';

const squareTarget = {
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
		isOver: monitor.isOver()
	};
}

class Square extends Component {
	render() {

		const {hit, isBusy, onSquareHover, connectDropTarget, isOver} = this.props;
		let className = 'board__square';
		if(hit) {
			className+= ` ${'hit'}`;
		}
		if(isBusy) {
			className+= ` ${'isBusy'}`;
		}

		return connectDropTarget(
			<div className={className} onMouseOver={onSquareHover}>
			</div>
		);
	}
}

export default DropTarget(DRAGGABLE_SHIP, squareTarget, collect)(Square);