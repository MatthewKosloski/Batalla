import React, {Component, PropTypes} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {getSmallestFromArray, haveSamePair, arraySplicer, getXCoordinates, getYCoordinates} from '../helpers';
import {addShips, placeShip, changeOrientation, setDragOrigin} from '../actions';
import {AIRCRAFT_CARRIER} from '../constants/ships';
import Ship from '../components/Ship';
import Square from '../components/Square';
import initialShips from '../data/initialShips';

class Board extends Component {

	constructor() {
		super();
		this.componentWillMount = this.componentWillMount.bind(this);
		this.renderSquare = this.renderSquare.bind(this);
		this.getShipsByType = this.getShipsByType.bind(this);
		this.renderShip = this.renderShip.bind(this);
	}

	componentWillMount() {
		const {dispatch} = this.props;
		dispatch(addShips(initialShips));
	}

	getShipsByType([...types]) {
		const {ships} = this.props;
		return [...types].map((type) => ships.filter((ship) => ship.type === type)[0]);
	}

	renderSquare(i) {
		const {ships, busySquares} = this.props;
		const x = i % 10;
		const y = Math.floor(i / 10);
		const isBusy = haveSamePair([[x, y]], busySquares);
		return (
			<Square key={i} x={x} y={y} isBusy={isBusy}/>
		);
	}

	handleShipClick(type, isHorizontal, coordinates) {
		const {dispatch, busySquares} = this.props;
		const [pivotX, pivotY] = coordinates[0];
		const busySquaresExcludingPivot = arraySplicer(busySquares, [[pivotX, pivotY]]);
		const newCoordinates = isHorizontal ? coordinates.map((pair, i) => [pivotX, pair[1] + i]) : coordinates.map((pair, i) => [pair[0] + i, pivotY]);
		const newOrientation = isHorizontal ? 'vertical' : 'horizontal';
		const canChangeOrientation = !haveSamePair(newCoordinates, busySquaresExcludingPivot);
		dispatch(changeOrientation(type, newOrientation, newCoordinates, canChangeOrientation));
	}

	handleShipHover(type, x, y) {
		const {dispatch} = this.props;
		dispatch(setDragOrigin(type, [x, y]));
	}

	renderShip(ship, index) {
		const {dispatch} = this.props;
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
				onShipHover={this.handleShipHover.bind(this, type)} 
				{...ship}
			/>
		);
	}

	render() {

		const renderedSquares = [];
		for(let i = 0; i < 100; i++) {
			renderedSquares.push(this.renderSquare(i));
		}

		const {ships} = this.props;
		const renderedShips = [];
		for(let i = 0; i < ships.length; i++) {
			renderedShips.push(this.renderShip(ships[i], i));
		}

		return(
			<div>
				<div className="board">
					{renderedShips}
					{renderedSquares}
				</div>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(Board);