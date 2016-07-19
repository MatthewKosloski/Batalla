import React, {PropTypes} from 'react';

function GameControls({isReady, canReadyUp, onShuffleClick, onReadyClick}) {

	let btnClassName = 'game__controls-btn btn btn--dark-blue btn--large';
	let containerStyle = {};
	if(isReady) containerStyle.display = 'none';

	return (

		<div className="game__controls" style={containerStyle}>
			<button 
				className={btnClassName} 
				onClick={onShuffleClick}>
				Shuffle
			</button>
			<button 
				className={canReadyUp ? btnClassName : btnClassName + ' btn--flash-dark-blue'}
				onClick={onReadyClick} 
				disabled={canReadyUp}>
				Ready
			</button>
		</div>

	);
}

GameControls.PropTypes = {
	canReadyUp: PropTypes.bool.isRequired,
	onShuffleClick: PropTypes.func.isRequired,
	onReadyClick: PropTypes.func.isRequired,
	isReady: PropTypes.bool.isRequired
}

export default GameControls;