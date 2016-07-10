import React, {Component, PropTypes} from 'react';

function NewGame({onNewGame, buttonText}) {
	return <button onClick={onNewGame}>{buttonText}</button>
}

NewGame.propTypes = {
	onNewGame: PropTypes.func.isRequired,
	buttonText: PropTypes.string.isRequired
}

export default NewGame;