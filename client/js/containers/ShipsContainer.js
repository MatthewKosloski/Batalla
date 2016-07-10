import React, {Component, PropTypes} from 'react';
import {changeOrientation, setDragOrigin} from '../actions';
import Ship from '../components/Ship';

import {
	haveSamePair, 
	arraySplicer, 
	areValidCoordinates, 
	calculateShipStyle
} from '../helpers';

class ShipsContainer extends Component {

	constructor() {
		super();
		this.renderShip = this.renderShip.bind(this);
	}

	renderShip(ship, index) {
		const {dispatch, busySquares, canDragShips, getShipsByType} = this.props;
		const {type, coordinates, orientation} = ship;
		const {length} = coordinates;
		const isHorizontal = orientation === 'horizontal';
		const style = calculateShipStyle(isHorizontal, coordinates);
		return (
			<Ship 
				key={index} 
				style={style}
				dispatch={dispatch} 
				onShipClick={this.handleShipClick.bind(this, type, isHorizontal, coordinates)} 
				onShipMouseDown={this.handleShipMouseDown.bind(this, type)}
				busySquares={busySquares} 
				getShipsByType={getShipsByType}
				canDragShips={canDragShips}
				{...ship}
			/>
		);
	}

	handleShipClick(type, isHorizontal, coordinates) {
		const {dispatch, busySquares, canDragShips} = this.props;
		const [pivotX, pivotY] = coordinates[0];
		const busySquaresExcludingPivot = arraySplicer(busySquares, [[pivotX, pivotY]]);
		const newCoordinates = isHorizontal ? coordinates.map((pair, i) => [pivotX, pair[1] + i]) : coordinates.map((pair, i) => [pair[0] + i, pivotY]);
		const newOrientation = isHorizontal ? 'vertical' : 'horizontal';
		const canChangeOrientation = !haveSamePair(newCoordinates, busySquaresExcludingPivot) && areValidCoordinates(newCoordinates) && canDragShips;
		dispatch(changeOrientation(type, newOrientation, newCoordinates, canChangeOrientation));
	}

	handleShipMouseDown(type, x, y) {
		const {dispatch} = this.props;
		dispatch(setDragOrigin(type, [x, y]));
	}

	render() {
		const {ships} = this.props;
		const shipComponents = [];
		for(let i = 0; i < ships.length; i++) {
			shipComponents.push(this.renderShip(ships[i], i));
		}
 
		return (
			<div className="ships-container">
				{shipComponents}
			</div>
		);
	}
}

ShipsContainer.propTypes = {
	ships: PropTypes.arrayOf(PropTypes.object).isRequired,
	busySquares: PropTypes.arrayOf(PropTypes.array).isRequired,
	canDragShips: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}

export default ShipsContainer;