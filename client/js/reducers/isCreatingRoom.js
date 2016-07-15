import {SET_CREATING_ROOM} from '../constants/actionTypes';

const isCreatingRoom = (state = false, action) => {
	switch (action.type) {
		case SET_CREATING_ROOM: {
			const {bool} = action.payload;
			return bool;
		}
		default: {
			return state;
		}
	}
};

export default isCreatingRoom;