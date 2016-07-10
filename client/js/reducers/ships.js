import {
	AIRCRAFT_CARRIER, 
	BATTLESHIP, 
	CRUISER, 
	DESTROYER, 
	SUBMARINE
} from '../constants/ships';

import {
	ADD_SHIPS, 
	PLACE_SHIP, 
	CHANGE_ORIENTATION, 
	SET_DRAG_ORIGIN,
	DESTROY_SHIP
} from '../constants/actionTypes';

const ships = (state = [], action) => {
	switch (action.type) {
		case DESTROY_SHIP: {
			const {type} = action.payload;
			const i = state.map((e) => e.type).indexOf(type);
			const destroyed = true;
			return [
				...state.slice(0, i),
				{
					...state[i],
					destroyed
				},
				...state.slice(i+1)
			];
		}
		case ADD_SHIPS: {
			const {ships} = action.payload;
			return [...ships];
		}
		case PLACE_SHIP: {
			const {type, coordinates, canPlace} = action.payload;
			const i = state.map((e) => e.type).indexOf(type);
			if(canPlace) {
				return [
					...state.slice(0, i),
					{
						...state[i],
						coordinates
					},
					...state.slice(i+1)
				]
			} else {
				return state;
			}
		}
		case CHANGE_ORIENTATION: {
			const {type, orientation, newCoordinates: coordinates, canChangeOrientation} = action.payload;
			const i = state.map((e) => e.type).indexOf(type);
			if(canChangeOrientation) {
				return [
					...state.slice(0, i),
					{
						...state[i],
						orientation,
						coordinates
					},
					...state.slice(i+1)
				]
			} else {
				return state;
			}
		}
		case SET_DRAG_ORIGIN: {
			const {type, dragOrigin} = action.payload;
			const i = state.map((e) => e.type).indexOf(type);
			return [
				...state.slice(0, i),
				{
					...state[i],
					dragOrigin
				},
				...state.slice(i+1)
			]
		}
		default: {
			return state;
		}
	}
};

export default ships;