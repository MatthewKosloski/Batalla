import {
	PLACE_SHIP, 
	ADD_SHIPS, 
	UPDATE_BUSY_SQUARES, 
	CHANGE_ORIENTATION, 
	SET_DRAG_ORIGIN,
	DISABLE_GAME,
	DISABLE_DRAGGING,
	OPPONENT_ARRIVED,
	OPPONENT_DEPARTED,
	OPPONENT_READY
} from '../constants/actionTypes';

export function opponentArrived() {
	return {
		type: OPPONENT_ARRIVED
	}
}

export function opponentDeparted() {
	return {
		type: OPPONENT_DEPARTED
	}
}

export function disableDragging() {
	return {
		type: DISABLE_DRAGGING
	}
}

export function disableGame() {
	return {
		type: DISABLE_GAME
	}
}


export function setDragOrigin(type, dragOrigin) {
	return {
		type: SET_DRAG_ORIGIN,
		payload: {
			type,
			dragOrigin
		}
	}
}

export function changeOrientation(type, orientation, newCoordinates, canChangeOrientation) {
	return (dispatch, getState) => {
		dispatch({ 
			type: CHANGE_ORIENTATION,
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
			type: PLACE_SHIP,
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
			type: ADD_SHIPS,
			payload: {
				ships
			}
		})
		dispatch(_updateBusySquares(getState().ships))
	}
}

function _updateBusySquares(ships) {
	return {
		type: UPDATE_BUSY_SQUARES,
		payload: {
			ships
		}
	}
}