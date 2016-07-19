import {
	DEFINE_MODAL,
	SHOW_MODAL,
	HIDE_MODAL,
	RESET_MODAL
} from '../constants/actionTypes';

const initialState = {
	show: false,
	title: null,
	description: null,
	isWinner: null
}

const modal = (state = initialState, action) => {
	switch (action.type) {
		case DEFINE_MODAL: {
			const {title, description, isWinner} = action.payload;
			return {
				show: true,
				title,
				description,
				isWinner
			};
		}
		case SHOW_MODAL: {
			return {
				...state,
				show: true
			};
		}
		case HIDE_MODAL: {
			return {
				...state,
				show: false
			};
		}
		case RESET_MODAL: {
			return state;
		}
		default: {
			return state;
		}
	}
};

export default modal;