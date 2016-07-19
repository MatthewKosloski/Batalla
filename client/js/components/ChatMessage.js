import React, {Component, PropTypes} from 'react';

function ChatMessage({type, time, text}) {

	let className = `game__aside-message message--${type}`;
	if(type !== 'client') className += ' message--bubble';

	return(
		<li className={className}>
			<div className="game__aside-message-inner">
				<span>{time}</span>
				<p>{text}</p>
			</div>
		</li>
	);
}

ChatMessage.propTypes = {
	type: PropTypes.oneOf(['client', 'opponent', 'player']).isRequired,
	time: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
}

export default ChatMessage;