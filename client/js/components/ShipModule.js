import React, {PropTypes} from 'react';

function ShipModule({x, y, onShipMouseDown, hit}) {
	return <span className={hit ? 'hit' : ''} onMouseDown={onShipMouseDown.bind(null, x, y)}></span>;
}

ShipModule.PropTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	onShipMouseDown: PropTypes.func.isRequired,
	hit: PropTypes.bool
}

export default ShipModule;