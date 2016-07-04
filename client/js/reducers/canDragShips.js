import {DISABLE_DRAGGING} from '../constants/actionTypes';

const canDragShips = (state = true, action) => {
	switch (action.type) {
		case DISABLE_DRAGGING: {
			return false;
		}
		default: {
			return state;
		}
	}
};

export default canDragShips;