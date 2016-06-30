import React, {Component, PropTypes} from 'react';
import {changeOrientation, setDragOrigin} from '../actions';
import {haveSamePair, getXCoordinates, getYCoordinates, getSmallestFromArray, arraySplicer, areValidCoordinates} from '../helpers';
import Ship from '../components/Ship';

class ShipsContainer extends Component {

	constructor() {
		super();
		this.getShipsByType = this.getShipsByType.bind(this);
		this.renderShip = this.renderShip.bind(this);
	}

	getShipsByType([...types]) {
		const {ships} = this.props;
		return [...types].map((type) => ships.filter((ship) => ship.type === type)[0]);
	}

	renderShip(ship, index) {
		const {dispatch, busySquares} = this.props;
		const {type, coordinates, orientation} = ship;
		const {length} = coordinates;
		const isHorizontal = orientation === 'horizontal';
		const xCoordinates = getXCoordinates(coordinates);
		const yCoordinates = getYCoordinates(coordinates);
		const smallestX = getSmallestFromArray(xCoordinates);
		const smallestY = getSmallestFromArray(yCoordinates);
		const style = {
			width: isHorizontal ? `${length * 10}%` : '10%',
			height: isHorizontal ? '10%' : `${length * 10}%`,
			top: isHorizontal ? `${coordinates[0][1] * 10}%` : `${smallestY * 10}%`,
			left: isHorizontal ? `${smallestX * 10}%` : `${coordinates[0][0] * 10}%` 
		};

		return (
			<Ship 
				key={index} 
				style={style}
				dispatch={dispatch} 
				onShipClick={this.handleShipClick.bind(this, type, isHorizontal, coordinates)} 
				onShipMouseDown={this.handleShipMouseDown.bind(this, type)}
				busySquares={busySquares} 
				getShipsByType={this.getShipsByType}
				{...ship}
			/>
		);
	}

	handleShipClick(type, isHorizontal, coordinates) {
		const {dispatch, busySquares} = this.props;
		const [pivotX, pivotY] = coordinates[0];
		const busySquaresExcludingPivot = arraySplicer(busySquares, [[pivotX, pivotY]]);
		const newCoordinates = isHorizontal ? coordinates.map((pair, i) => [pivotX, pair[1] + i]) : coordinates.map((pair, i) => [pair[0] + i, pivotY]);
		const newOrientation = isHorizontal ? 'vertical' : 'horizontal';
		const canChangeOrientation = !haveSamePair(newCoordinates, busySquaresExcludingPivot) && areValidCoordinates(newCoordinates);
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
	dispatch: PropTypes.func.isRequired
}

export default ShipsContainer;