import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';

const socket = io();

class AppContainer extends Component {

	render() {
		return(
			<div>
				{React.cloneElement(this.props.children, { ...this.props, key: undefined, ref: undefined })}
			</div>
		);
	}
}

function mapStateToProps() {
	return {
		socket
	}
}

export default connect(mapStateToProps)(AppContainer);