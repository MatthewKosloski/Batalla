import React, {Component, PropTypes} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {addShips} from '../actions';
import ShipsContainer from './ShipsContainer';
import SquaresContainer from './SquaresContainer';
import initialShips from '../data/initialShips';

class Board extends Component {

	constructor() {
		super();
		this.componentWillMount = this.componentWillMount.bind(this);
	}

	componentWillMount() {
		const {dispatch} = this.props;
		dispatch(addShips(initialShips));
	}

	render() {
		const {ships, busySquares, dispatch} = this.props;
		return (
			<div className="board">
				<ShipsContainer 
					ships={ships}
					busySquares={busySquares}
					dispatch={dispatch} 
				/>
				<SquaresContainer
					ships={ships}
					busySquares={busySquares}
				/>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(Board);