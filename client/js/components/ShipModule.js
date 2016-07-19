import React, {PropTypes} from 'react';

function ShipModule({x, y, onShipMouseDown, isHit}) {
	let className = 'ship__module';
	if(isHit) className += ' hit';
	return (
		<div className={className} onMouseDown={onShipMouseDown.bind(null, x, y)}>
			<div className="board__square-dot dot--dark-gray"></div>
		</div>
	);
}

ShipModule.PropTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	onShipMouseDown: PropTypes.func,
	isHit: PropTypes.bool
}

export default ShipModule;