import {SET_WINNER_STATUS} from '../constants/actionTypes';

const isWinner = (state = null, action) => {
	switch (action.type) {
		case SET_WINNER_STATUS: {
			const {bool} = action.payload;
			return bool;
		}
		default: {
			return state;
		}
	}
};

export default isWinner;