import {OPPONENT_ARRIVED, OPPONENT_DEPARTED} from '../constants/actionTypes';

const noOpponent = (state = true, action) => {
	switch (action.type) {
		case OPPONENT_ARRIVED: {
			return false;
		}
		case OPPONENT_DEPARTED: {
			return true;
		}
		default: {
			return state;
		}
	}
};

export default noOpponent;