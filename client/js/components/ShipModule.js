import React, {PropTypes} from 'react';

function ShipModule({x, y, onShipMouseDown, hit}) {
	let className = 'ship__module';
	if(hit) className += ' hit';
	return (
		<div className={className} onMouseDown={onShipMouseDown.bind(null, x, y)}>
			<div className="board__square-dot dot--dark-gray"></div>
		</div>
	);
}

ShipModule.PropTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	onShipMouseDown: PropTypes.func.isRequired,
	hit: PropTypes.bool
}

export default ShipModule;