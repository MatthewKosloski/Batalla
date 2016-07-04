import {GUESS_POSITION} from '../constants/actionTypes';

const playerGuesses = (state = [], action) => {
	switch (action.type) {
		case 'GUESS_POSITION': {
			return state;
		}
		default: {
			return state;
		}
	}
};

export default playerGuesses;