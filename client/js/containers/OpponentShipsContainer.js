import React, {Component, PropTypes} from 'react';
import {calculateShipStyle} from '../helpers';

class OpponentShipsContainer extends Component {

	renderShip(ship, index) {
		const {coordinates, orientation} = ship;
		const isHorizontal = orientation === 'horizontal';
		const style = calculateShipStyle(isHorizontal, coordinates);
		return <div key={index} className="board__ship opponent-ship" style={style}></div>;
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