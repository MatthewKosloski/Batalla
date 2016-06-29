import {UPDATE_BUSY_SQUARES} from '../constants/actionTypes';

const busySquares = (state = [], action) => {
	switch (action.type) {
		case UPDATE_BUSY_SQUARES: {
			const {ships} = action.payload;
			
			const shipCoordinates = [];
			for(let i = 0; i < ships.length; i++) {
				shipCoordinates.push(ships[i].coordinates);
			}
			const busySquareCoordinates = [];
			for(let i = 0; i < shipCoordinates.length; i++) {
				for(let j = 0; j < ships[i].coordinates.length; j++) {
					const crds = ships[i].coordinates[j]; 
					busySquareCoordinates.push([crds[0], crds[1]]);
				}
			}
			return [...busySquareCoordinates];
		}
		default: {
			return state;
		}
	}
};

export default busySquares;