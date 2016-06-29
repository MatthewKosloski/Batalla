import React, {Component, PropTypes} from 'react';

function ShipModule({x, y, onShipHover, hit}) {
	return <span className={hit ? 'hit' : ''} onMouseOver={onShipHover.bind(null, x, y)}></span>;
}

ShipModule.PropTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	onShipHover: PropTypes.func.isRequired,
	hit: PropTypes.bool
}

export default ShipModule;