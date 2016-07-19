import React, {Component, PropTypes} from 'react';
import {calculateShipStyle} from '../helpers';

class OpponentShipsContainer extends Component {

	renderShip(ship, index) {
		const {coordinates, orientation, type} = ship;
		const isHorizontal = orientation === 'horizontal';
		const style = calculateShipStyle(isHorizontal, coordinates);

		let className = `board__ship opponent-ship ${type.toLowerCase()} ${orientation}`;

		let shipModules = [];
		for(let i = 0; i < coordinates.length; i++) {
			shipModules.push(
				<div key={i} className="ship__module hit">
					<div className="board__square-dot"></div>
				</div>
			)
		}

		return (
			<div key={index} className={className} style={style}>
				{shipModules}
			</div>
		);
	}

	render() {
		const {shipsSunkByPlayer} = this.props;
		const shipComponents = [];
		for(let i = 0; i < shipsSunkByPlayer.length; i++) {
			shipComponents.push(this.renderShip(shipsSunkByPlayer[i], i));
		}
		return(
			<div className="ships-container">
				{shipComponents}
			</div>
		);
	}
}

export default OpponentShipsContainer;