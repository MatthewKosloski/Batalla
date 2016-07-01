import {DISABLE_GAME} from '../constants/actionTypes';

const gameDisabled = (state = false, action) => {
	switch (action.type) {
		case DISABLE_GAME: {
			return true;
		}
		default: {
			return state;
		}
	}
};

export default gameDisabled;