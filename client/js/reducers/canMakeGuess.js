import {CAN_GUESS} from '../constants/actionTypes';

const canMakeGuess = (state = false, action) => {
	switch (action.type) {
		case CAN_GUESS: {
			const {bool} = action.payload;
			return bool;
		}
		default: {
			return state;
		}
	}
};

export default canMakeGuess;