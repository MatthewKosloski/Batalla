import {
	PLACE_SHIP, 
	ADD_SHIPS, 
	UPDATE_BUSY_SQUARES, 
	CHANGE_ORIENTATION, 
	SET_DRAG_ORIGIN
} from '../constants/actionTypes';

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