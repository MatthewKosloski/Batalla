import * as shipTypes from '../constants/ships';

const shipsSchema = [
	{
		type: shipTypes.AIRCRAFT_CARRIER,
		dragOrigin: [],
		length: 5
	},
	{
		type: shipTypes.BATTLESHIP,
		dragOrigin: [],
		length: 4
	},
	{
		type: shipTypes.CRUISER,
		dragOrigin: [],
		length: 3
	},
	{
		type: shipTypes.DESTROYER,
		dragOrigin: [],
		length: 2
	},
	{
		type: shipTypes.SUBMARINE,
		dragOrigin: [],
		length: 1
	}
];

export default shipsSchema;