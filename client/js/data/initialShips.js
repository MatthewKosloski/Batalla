import {AIRCRAFT_CARRIER, BATTLESHIP, CRUISER, DESTROYER, SUBMARINE} from '../constants/ships';

const initialShips = [
	{
		type: AIRCRAFT_CARRIER,
		coordinates: [[1,0], [2,0], [3,0], [4,0], [5,0]],
		orientation: 'horizontal',
		dragOrigin: []
	},
	{
		type: BATTLESHIP,
		coordinates: [[6,4], [6,5], [6,6], [6,7]],
		orientation: 'vertical',
		dragOrigin: []
	},
	{
		type: CRUISER,
		coordinates: [[6,2], [7,2], [8,2]],
		orientation: 'horizontal',
		dragOrigin: []
	},
	{
		type: DESTROYER,
		coordinates: [[0,8], [0,9]],
		orientation: 'vertical',
		dragOrigin: []
	},
	{
		type: SUBMARINE,
		coordinates: [[3,6]],
		orientation: 'horizontal',
		dragOrigin: []
	}
];

export default initialShips;