import * as actions from '../constants/actionTypes';

export function addSunkenShip(type, coordinates) {
	return {
		type: actions.ADD_SUNKEN_SHIP,
		payload: {
			type,
			coordinates
		}
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
	return {
		type: actions.OPPONENT_READY
	}
}

export function opponentArrived() {
	return {
		type: actions.OPPONENT_ARRIVED
	}
}

export function opponentDeparted() {
	return {
		type: actions.OPPONENT_DEPARTED
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