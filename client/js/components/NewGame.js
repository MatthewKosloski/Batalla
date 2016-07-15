import React, {Component, PropTypes} from 'react';

function NewGame({onNewGame, buttonText, className}) {
	return <button onClick={onNewGame} className={className}>{buttonText}</button>
}

NewGame.propTypes = {
	onNewGame: PropTypes.func.isRequired,
	buttonText: PropTypes.string.isRequired,
	className: PropTypes.string
}

export default NewGame;