import {ADD_OPPONENT_GUESS} from '../constants/actionTypes';

const opponentGuesses = (state = [], action) => {
	switch (action.type) {
		case ADD_OPPONENT_GUESS: {
			const {guess} = action.payload;
			return [
				...state, 
				guess
			];
		}
		default: {
			return state;
		}
	}
};

export default opponentGuesses;