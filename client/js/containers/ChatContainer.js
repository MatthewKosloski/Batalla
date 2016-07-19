import React, {Component, PropTypes} from 'react';
import ChatMessage from '../components/ChatMessage';
import {addChatMessage} from '../actions';
import {getHoursMinutes} from '../helpers';

import {
	SEND_MESSAGE, 
	RECEIVE_MESSAGE
} from '../../../common/constants/socketEvents';


class ChatContainer extends Component {


	constructor() {
		super();
		this.componentDidMount = this.componentDidMount.bind(this);
		this.renderMessageComponent = this.renderMessageComponent.bind(this);
		this.handleChatForm = this.handleChatForm.bind(this);
		this.handleReceivedMessage = this.handleReceivedMessage.bind(this);
	}

	componentDidMount() {
		const {socket} = this.props;
		socket.on(RECEIVE_MESSAGE, this.handleReceivedMessage);
	}

	handleReceivedMessage(message) {
		const {dispatch} = this.props;
		const {type, time, text} = message;
		dispatch(addChatMessage(type, time, text));
	}

	handleChatForm(e) {
		e.preventDefault();
		const {socket, dispatch, gameId, canChat} = this.props;
		const {chatForm, chatFormText} = this.refs;
		const text = chatFormText.value;
		const time = getHoursMinutes();
		if(canChat && text.length) {
			dispatch(addChatMessage('player', time, text));
			socket.emit(SEND_MESSAGE, {type: 'opponent', time, text, gameId});
			chatForm.reset();
		}
	}

	renderMessageComponent(message, i) {
		const {type, time, text} = message;
		return(
			<ChatMessage key={i} type={type} time={time} text={text} />
		);
	}

	render() {

		const {messages, canChat} = this.props;
		const messageComponents = [];
		for(let i = 0; i < messages.length; i++) {
			messageComponents.push(this.renderMessageComponent(messages[i], i));
		}

		return (
			<div className="game__aside-inner">
				<ul className="game__aside-messages">
					{messageComponents}
				</ul>
				<form ref="chatForm" className="game__aside-form" onSubmit={this.handleChatForm}>
					<fieldset className="game__aside-form-inner" disabled={!canChat}>
						<input 
							ref="chatFormText"
							className="game__aside-form-input" 
							type="text" 
							placeholder="type a message..." />
					</fieldset>
				</form>
			</div>
		);
	}
}

ChatContainer.propTypes = {
	socket: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
	messages: PropTypes.arrayOf(PropTypes.object).isRequired,
	gameId: PropTypes.string.isRequired,
	canChat: PropTypes.bool.isRequired
}

export default ChatContainer;