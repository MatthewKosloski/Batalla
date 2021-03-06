import React, {Component, PropTypes} from 'react';
import ShipModule from '../components/ShipModule';
import {DragSource} from 'react-dnd';
import {DRAGGABLE_SHIP} from '../constants/ships';
import {haveSamePair, arraySplicer, areValidCoordinates} from '../helpers';
import {placeShip} from '../actions';

const shipSource = {
	beginDrag(props) {
		const {dragOrigin, coordinates, type} = props;
		return {dragOrigin, coordinates, type};
	},
	endDrag(props, monitor) {
		const {dispatch, busySquares, getShipsByType, canDragShips} = props;
		const draggedShip = monitor.getItem();
		const {dragOrigin, coordinates, type} = draggedShip;
		const [dragOriginX, dragOriginY] = dragOrigin;
		const dropLocation = monitor.getDropResult() || {};
		const {dropLocationX, dropLocationY} = dropLocation;
		const horizontalChange = Math.abs(dragOriginX - dropLocationX);
		const verticalChange = Math.abs(dragOriginY - dropLocationY);
		const left = dragOriginX > dropLocationX && horizontalChange > 0;
		const right = dragOriginX < dropLocationX && horizontalChange > 0;
		const up = dragOriginY > dropLocationY && verticalChange > 0;
		const down = dragOriginY < dropLocationY && verticalChange > 0;
		if (dropLocation !== null) {
			const newCoordinates = coordinates.map((crd, i) => {
				const [crdX, crdY] = crd;
				const x = left ? (crdX - horizontalChange) : right ? (crdX + horizontalChange) : crdX;
				const y = up ? (crdY - verticalChange) : down ? (crdY + verticalChange) : crdY;
				return [Math.abs(x), Math.abs(y)];
			});
			const busySquaresExcludingShip = arraySplicer(busySquares, getShipsByType([type])[0].coordinates);
			const canPlace = !haveSamePair(newCoordinates, busySquaresExcludingShip) && areValidCoordinates(newCoordinates) && canDragShips;
			dispatch(placeShip(type, newCoordinates, canPlace));
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
		const {onShipMouseDown, busySquares, opponentGuesses} = this.props;
		const [x, y] = coordinates;
		const isBusy = haveSamePair([[x, y]], busySquares);
		const isGuessed = haveSamePair([[x, y]], opponentGuesses);
		const isHit = isBusy && isGuessed;
		return(
			<ShipModule 
				key={index} 
				x={x} 
				y={y}
				isHit={isHit} 
				onShipMouseDown={onShipMouseDown}
			/>
		);
	}

	render() {
		const {
			orientation, 
			type, 
			coordinates, 
			onShipClick, 
			style, 
			connectDragSource, 
			isDragging,
			shipsDestroyed
		} = this.props;

		let className = `board__ship ${type.toLowerCase()} ${orientation}`;
		if(shipsDestroyed.indexOf(type) !== -1) {
			className += ' ship--destroyed';
		}
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
	dispatch: PropTypes.func.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	busySquares: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
	isDragging: PropTypes.bool.isRequired,
	getShipsByType: PropTypes.func.isRequired,
	canDragShips: PropTypes.bool.isRequired,
	shipsDestroyed: PropTypes.array.isRequired,
};

export default DragSource(DRAGGABLE_SHIP, shipSource, collect)(Ship);