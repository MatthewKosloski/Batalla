import {OPPONENT_READY} from '../constants/actionTypes';

const isWaitingForOpponent = (state = true, action) => {
	switch (action.type) {
		case OPPONENT_READY: {
			return false;
		}
		default: {
			return state;
		}
	}
};

export default isWaitingForOpponent;