import React, {Component, PropTypes} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {addShips} from '../actions';
import ShipsContainer from '../containers/ShipsContainer';
import DropTargetSquaresContainer from '../containers/DropTargetSquaresContainer';
import initialShips from '../data/initialShips';

class DraggableBoard extends Component {

	constructor() {
		super();
		this.componentWillMount = this.componentWillMount.bind(this);
	}

	componentWillMount() {
		const {dispatch} = this.props;
		dispatch(addShips(initialShips));
	}

	render() {
		const {
			ships, 
			busySquares, 
			canDragShips, 
			dispatch,
			opponentGuesses,
			getShipsByType
		} = this.props;
		return (
			<div className="board board--draggable">
				<ShipsContainer 
					ships={ships}
					busySquares={busySquares}
					dispatch={dispatch}
					canDragShips={canDragShips} 
					getShipsByType={getShipsByType}
				/>
				<DropTargetSquaresContainer
					busySquares={busySquares}
					opponentGuesses={opponentGuesses}
					canDragShips={canDragShips}
				/>
			</div>
		);
	}
}

DraggableBoard.propTypes = {
	ships: PropTypes.arrayOf(PropTypes.object).isRequired,
	busySquares: PropTypes.arrayOf(PropTypes.array).isRequired,
	dispatch: PropTypes.func.isRequired,
	canDragShips: PropTypes.bool.isRequired,
	getShipsByType: PropTypes.func.isRequired
}

export default DragDropContext(HTML5Backend)(DraggableBoard);