import {ADD_PLAYER_GUESS} from '../constants/actionTypes';

const playerGuesses = (state = [], action) => {
	switch (action.type) {
		case ADD_PLAYER_GUESS: {
			return [
				...state, 
				action.payload
			];
		}
		default: {
			return state;
		}
	}
};

export default playerGuesses;