import {ADD_CHAT_MESSAGE} from '../constants/actionTypes';

const initialState = [
	{
		type: 'opponent', 
		time: '00:39', 
		text: 'You will lose!'
	},
	{
		type: 'player', 
		time: '00:40', 
		text: 'No, absolutely not.  I believe I will annihilate you.'
	},
	{
		type: 'client', 
		time: '00:42', 
		text: 'Your submarine has been destroyed.'
	},
];

const messages = (state = [], action) => {
	switch (action.type) {
		case ADD_CHAT_MESSAGE: {
			const {type, time, text} = action.payload;
			return [
				...state, 
				{
					type,
					time,
					text
				}
			];
		}
		default: {
			return state;
		}
	}
};

export default messages;