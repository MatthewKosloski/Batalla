import * as actions from '../constants/actionTypes';
import {getHoursMinutes, prettify} from '../helpers';

export function defineModal(title, description, isWinner) {
	return {
		type: actions.DEFINE_MODAL,
		payload: {
			title,
			description,
			isWinner
		}
	}
}

export function showModal() {
	return {
		type: actions.SHOW_MODAL
	}
}

export function hideModal() {
	return (dispatch) => {
		dispatch({type: actions.HIDE_MODAL})
		dispatch(resetModal())
	}
}

export function resetModal() {
	return {
		type: actions.RESET_MODAL
	}
}

export function addChatMessage(type, time, text) {
	return {
		type: actions.ADD_CHAT_MESSAGE,
		payload: {
			type,
			time,
			text
		}
	}
}

export function playerReady() {
	return (dispatch) => {
		dispatch({type: actions.PLAYER_READY})
		dispatch(disableDragging())
	}
}

export function setCreatingRoom(bool) {
	return {
		type: actions.SET_CREATING_ROOM,
		payload: {
			bool
		}
	}
}

export function setWinnerStatus(bool) {
	return {
		type: actions.SET_WINNER_STATUS,
		payload: {
			bool
		}
	}
}

export function addSunkenShip(type, coordinates, orientation) {
	return (dispatch) => {
		dispatch({
			type: actions.ADD_SUNKEN_SHIP,
			payload: {
				type,
				coordinates,
				orientation
			}
		})
		dispatch(addChatMessage('client', getHoursMinutes(), `You destroyed the opponent's ${prettify(type, true)}.`))
	}
}

export function calculateDestroyedShips(ships, opponentGuesses) {
	return {
		type: actions.CALCULATE_DESTROYED_SHIPS,
		payload: {
			ships,
			opponentGuesses
		}
	}
}

export function destroyShip(type) {
	return {
		type: actions.DESTROY_SHIP,
		payload: {
			type
		}
	}
}

export function addPlayerGuess(guess, hit) {
	return {
		type: actions.ADD_PLAYER_GUESS,
		payload: {
			guess,
			hit
		}
	}
}

export function addOpponentGuess(guess) {
	return (dispatch, getState) => {
		dispatch({ 
			type: actions.ADD_OPPONENT_GUESS,
			payload: {
				guess
			}
		})
		dispatch(canGuess(true))
		dispatch(calculateDestroyedShips(getState().ships, getState().opponentGuesses))
	}
}

export function canGuess(bool) {
	return {
		type: actions.CAN_GUESS,
		payload: {
			bool
		}
	}
}

export function opponentReady() {
	return (dispatch) => {
		dispatch({type: actions.OPPONENT_READY})
		dispatch(addChatMessage('client', getHoursMinutes(), 'The opponent is now ready.'))
	}
}

export function opponentArrived() {
	return (dispatch) => {
		dispatch({type: actions.OPPONENT_ARRIVED})
		dispatch(addChatMessage('client', getHoursMinutes(), 'The opponent has connected.'))
	}
}

export function opponentDeparted() {
	return (dispatch) => {
		dispatch({type: actions.OPPONENT_DEPARTED})
		dispatch(addChatMessage('client', getHoursMinutes(), 'The opponent has disconnected.'))
	}
}

export function disableDragging() {
	return {
		type: actions.DISABLE_DRAGGING
	}
}

export function disableGame() {
	return {
		type: actions.DISABLE_GAME
	}
}


export function setDragOrigin(type, dragOrigin) {
	return {
		type: actions.SET_DRAG_ORIGIN,
		payload: {
			type,
			dragOrigin
		}
	}
}

export function changeOrientation(type, orientation, newCoordinates, canChangeOrientation) {
	return (dispatch, getState) => {
		dispatch({ 
			type: actions.CHANGE_ORIENTATION,
			payload: {
				type,
				orientation,
				newCoordinates,
				canChangeOrientation
			}
		})
		dispatch(_updateBusySquares(getState().ships))
	}
}

export function placeShip(type, coordinates, canPlace) {
	return (dispatch, getState) => {
		dispatch({ 
			type: actions.PLACE_SHIP,
			payload: {
				type,
				coordinates,
				canPlace
			} 
		})
		dispatch(_updateBusySquares(getState().ships))
	}
}

export function addShips(ships) {
	return (dispatch, getState) => {
		dispatch({
			type: actions.ADD_SHIPS,
			payload: {
				ships
			}
		})
		dispatch(_updateBusySquares(getState().ships))
	}
}

function _updateBusySquares(ships) {
	return {
		type: actions.UPDATE_BUSY_SQUARES,
		payload: {
			ships
		}
	}
}