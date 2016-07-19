import {PLAYER_READY} from '../constants/actionTypes';

const isReady = (state = false, action) => {
	switch (action.type) {
		case PLAYER_READY: {
			return true;
		}
		default: {
			return state;
		}
	}
};

export default isReady;