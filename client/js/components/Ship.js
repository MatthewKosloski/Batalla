import React, {Component, PropTypes} from 'react';
import ShipModule from '../components/ShipModule';
import {DragSource} from 'react-dnd';
import {DRAGGABLE_SHIP} from '../constants/ships';
import {placeShip} from '../actions';

const shipSource = {
	beginDrag(props) {
		const {dragOrigin, coordinates, type, dispatch} = props;
		return {dragOrigin, coordinates, type, dispatch};
	},
	endDrag(props, monitor) {
		const draggedShip = monitor.getItem();
		const dropLocation = monitor.getDropResult();
		const {dragOrigin, coordinates, type, dispatch} = draggedShip;
		const [dragOriginX, dragOriginY] = dragOrigin;
		const {dropLocationX, dropLocationY} = dropLocation;
		const horizontalChange = Math.abs(dragOriginX - dropLocationX);
		const verticalChange = Math.abs(dragOriginY - dropLocationY);
		const left = dragOriginX > dropLocationX && horizontalChange > 0;
		const right = dragOriginX < dropLocationX && horizontalChange > 0;
		const up = dragOriginY > dropLocationY && verticalChange > 0;
		const down = dragOriginY < dropLocationY && verticalChange > 0;
		let newCoordinates;
		if (dropLocation) {
			newCoordinates = coordinates.map((crd, i) => {
				const [crdX, crdY] = crd;
				const x = left ? (crdX - horizontalChange) : right ? (crdX + horizontalChange) : crdX;
				const y = up ? (crdY - verticalChange) : down ? (crdY + verticalChange) : crdY;
				return [x, y];
			});
			dispatch(placeShip(type, newCoordinates, true));
		}
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

class Ship extends Component {

	constructor() {
		super();
		this.renderModules = this.renderModules.bind(this);
	}

	renderModules(coordinates, index) {
		const {onShipHover} = this.props;
		const [x, y] = coordinates;
		return(
			<ShipModule key={index} x={x} y={y} onShipHover={onShipHover}/>
		);
	}

	render() {

		const {orientation, type, coordinates, onShipClick, style, connectDragSource, isDragging} = this.props;

		let className = `board__ship ${type.toLowerCase()} ${orientation}`;
		const modules = [];
		for(let i = 0; i < coordinates.length; i++) {
			modules.push(this.renderModules(coordinates[i], i));
		}
		
		return connectDragSource(
			<div className={className} style={style} onClick={onShipClick}>
				{modules}
			</div>
		);
	}
}

Ship.propTypes = {
	orientation: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	coordinates: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
	onShipClick: PropTypes.func.isRequired,
	style: PropTypes.object.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired
};

export default DragSource(DRAGGABLE_SHIP, shipSource, collect)(Ship);