/*

	shipsDestroyed is merely an array of ship types
	that represent the ships that have been destroyed 
	by the opponent (These belong to the client).

	Example: ['SUBMARINE', 'DESTROYER']
	
	--
	Not to be confused with shipsSunkByPlayer, 
	which is an array of objects representing opponent 
	ships that the player sunk.

*/

import {CALCULATE_DESTROYED_SHIPS} from '../constants/actionTypes';

const shipsDestroyed = (state = [], action) => {
	switch (action.type) {
		case CALCULATE_DESTROYED_SHIPS: {
			const {ships, opponentGuesses} = action.payload;
			let result = [];
			ships.map((ship) => {
				let {coordinates, type} = ship;
				return coordinates.map((crd) => {
					return opponentGuesses.filter((guess) => {
						return crd[0] === guess[0] && crd[1] === guess[1];
					}).length;
				}).indexOf(0) === -1 ? result.push(type) : null;
			});
			return result;
		}
		default: {
			return state;
		}
	}
};

export default shipsDestroyed;