import React, {Component} from 'react';

class BoardsDesignContainer extends Component {

	render() {
		return(
			<div className="game">

				<main className="game__main">
					<header className="game__header">
						<div className="game__header-inner">
							<h1 className="game__header-title">Waiting for Opponent</h1>
							<p className="game__header-description">While you wait, you can place your ships</p>
						</div>
					</header>
					<div className="game__boards">
						<div className="game__board board--player">
							<div className="game__board-inner">
								Your Board
							</div>
						</div>
						<div className="game__board board--opponent">
							<div className="game__board-inner">
								Your Opponent's Board
							</div>
						</div>
					</div>
				</main>
				<aside className="game__aside">
					<div className="game__aside-inner">
						Chatlog goes here!
					</div>
				</aside>

			</div>
		);
	}
}

export default BoardsDesignContainer;