import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Main extends Component {
	render() {
		return(
			<div>
				{React.cloneElement(this.props.children, { ...this.props, key: undefined, ref: undefined })}
			</div>
		);
	}
}

// the state of our entire app
function mapStateToProps(state) {
	const {ships, busySquares} = state;
	return {
		ships,
		busySquares
	}
}

export default connect(mapStateToProps)(Main);