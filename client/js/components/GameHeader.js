import React, {PropTypes} from 'react';

function GameHeader({isReady, noOpponent, isWaitingForOpponent, canMakeGuess, isWinning, isTie}) {

	let headerTitle, headerDescription;

	if(noOpponent) {
		headerTitle = 'Opponent not connected';
		headerDescription = 'share the url with a friend to play';
	}else if(!noOpponent && isWaitingForOpponent) {
		headerTitle = 'Opponent is not ready';
		headerDescription = 'the opponent is placing his ships';
	} else if(!noOpponent && !isReady){
		headerTitle = 'Opponent is waiting for you';
		headerDescription = 'place your ships and click ready';
	} else if(canMakeGuess || !canMakeGuess) {
		headerTitle = canMakeGuess ? 'Your turn' : 'Opponent\'s turn';
		headerDescription = isWinning ? 'you\'re winning' : isTie ? 'it\'s a tie' : 'you\'re losing';
	}

	return (
		<header className="game__header">
			<div className="game__header-inner">
				<h1 className="game__header-title">{headerTitle}</h1>
				<p className="game__header-description">{headerDescription}</p>
			</div>
		</header>
	);
}

GameHeader.propTypes = {
	noOpponent: PropTypes.bool.isRequired,
	isWaitingForOpponent: PropTypes.bool.isRequired,
	canMakeGuess: PropTypes.bool.isRequired,
	isWinning: PropTypes.bool.isRequired,
	isTie: PropTypes.bool.isRequired,
	isReady: PropTypes.bool.isRequired
};

export default GameHeader;