import React, {Component, PropTypes} from 'react';

function NewGame({onNewGame, text}) {
	return <button onClick={onNewGame}>{text}</button>
}

NewGame.propTypes = {
	onNewGame: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired
}

export default NewGame;