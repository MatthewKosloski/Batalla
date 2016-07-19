/*

	shipsSunkByPlayer is an array of objects representing 
	opponent ships that the player sunk.

	Example: [{type: 'SUBMARINE', coordinates: [[3,6]]}]
	
	--
	Not to be confused with shipsDestroyed, which
	is merely an array of ship types that represent 
	the ships that have been destroyed by the opponent 
	(These belong to the client).

*/

import {ADD_SUNKEN_SHIP} from '../constants/actionTypes';

const shipsSunkByPlayer = (state = [], action) => {
	switch (action.type) {
		case ADD_SUNKEN_SHIP: {
			const {type, coordinates, orientation} = action.payload;
			return [
				...state,
				{
					type: type[0],
					coordinates,
					orientation
				}
			]
		}	
		default: {
			return state;
		}
	}
};

export default shipsSunkByPlayer;