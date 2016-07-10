import * as ships from '../constants/ships';

const initialShips = [
	{
		type: ships.AIRCRAFT_CARRIER,
		coordinates: [[1,0], [2,0], [3,0], [4,0], [5,0]],
		orientation: 'horizontal',
		dragOrigin: []
	},
	{
		type: ships.BATTLESHIP,
		coordinates: [[6,4], [6,5], [6,6], [6,7]],
		orientation: 'vertical',
		dragOrigin: []
	},
	{
		type: ships.CRUISER,
		coordinates: [[6,2], [7,2], [8,2]],
		orientation: 'horizontal',
		dragOrigin: []
	},
	{
		type: ships.DESTROYER,
		coordinates: [[0,8], [0,9]],
		orientation: 'vertical',
		dragOrigin: []
	},
	{
		type: ships.SUBMARINE,
		coordinates: [[3,6]],
		orientation: 'horizontal',
		dragOrigin: []
	}
];

export default initialShips;