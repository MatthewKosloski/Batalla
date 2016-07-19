import React, {Component, PropTypes} from 'react';

class ModalContainer extends Component {
	render() {
		const {modal} = this.props;
		const {show, title, description, isWinner} = modal;

		let containerClassName = 'modal';
		let contentClassName = 'modal__content';
		let tweetComponent;
		if(show)  {
			containerClassName += ' modal--visible';
			contentClassName += ' content--visible';
		}
		if(isWinner) {
			containerClassName += ' modal--winner';
			tweetComponent = <a className="btn btn--dark-blue modal__button" href="https://twitter.com/intent/tweet?text=I%20won">Share Result</a>;
		} else {
			containerClassName += ' modal--loser';
			tweetComponent = <a className="btn btn--dark-blue modal__button" href="https://twitter.com/intent/tweet?text=I%20lost">Share Result</a>;
		}


		let iconComponent = isWinner ? 
			<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48"><path fill-rule="evenodd" clip-rule="evenodd" d="M36 18c0 5.59-3.827 10.272-9 11.606V40h6c.553 0 1 .448 1 1 0 .553-.447 1-1 1H15c-.553 0-1-.447-1-1 0-.552.447-1 1-1h6V29.606C15.827 28.272 12 23.59 12 18c-3.866 0-7-3.134-7-7V9c0-.552.447-1 1-1h6V7c0-1.657-1.343-3-3-3-.553 0-1-.448-1-1s.447-1 1-1h30c.553 0 1 .448 1 1s-.447 1-1 1c-1.657 0-3 1.343-3 3v1h6c.553 0 1 .448 1 1v2c0 3.866-3.134 7-7 7zM23 40h2V29.95c-.33.027-.662.05-1 .05s-.67-.023-1-.05V40zM7 10v1c0 2.762 2.238 5 5 5v-6H7zm5.978-6C13.61 4.838 14 5.87 14 7v11c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10V7c0-1.13.39-2.162 1.022-3H12.978zM41 10h-5v6c2.762 0 5-2.238 5-5v-1zM12 44h24c.553 0 1 .448 1 1 0 .553-.447 1-1 1H12c-.553 0-1-.447-1-1 0-.552.447-1 1-1z"/></svg>
			:
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill-rule="evenodd" clip-rule="evenodd" d="M36.992 20.483v4.02l-3.485 2.01-2.01 3.483h-.51V45l-.002.01c.004.255-.09.51-.283.705s-.45.287-.705.283l-.01.002c-.32 0-.593-.16-.775-.395l-5.225-5.225-5.225 5.225c-.182.235-.454.395-.775.395l-.01-.002c-.255.004-.51-.09-.705-.283-.193-.194-.287-.45-.283-.704 0-.003-.003-.006-.003-.01V30v-.004h-.506l-2.01-3.482-3.485-2.01v-4.02L8.975 17l2.01-3.482V9.495l3.484-2.013 2.01-3.48h4.026l3.48-2.01L27.47 4h4.025l2.01 3.48 3.485 2.013v4.022L39 17l-2.008 3.483zM18.987 30v12.62l4.19-4.19c.032-.048.053-.102.095-.145.197-.196.457-.287.715-.28.258-.007.518.084.715.28.042.043.062.097.095.144l4.19 4.19V30v-.004h-1.516l-3.483 2.013-3.48-2.014h-1.52V30zm16-15.948V10.65L32.04 8.945l-1.7-2.943h-3.406l-2.945-1.7-2.944 1.7H17.64l-1.7 2.942-2.95 1.703v3.404l-1.7 2.95 1.7 2.946v3.4l2.95 1.702 1.7 2.945h3.405l2.943 1.7 2.945-1.7h3.405l1.7-2.945 2.948-1.702v-3.4l1.7-2.947-1.7-2.948z"/></svg>

		return(
			<div className={containerClassName}>
				<div className={contentClassName}>
					<div className="modal__info">
						{iconComponent}
						<h2 className="modal__title">{title}</h2>
						<p className="modal__description">{description}</p>
					</div>
					<div className="modal__actions">
						{tweetComponent}
						<a className="modal__link" href="/">leave</a>
					</div>
				</div>
			</div>
		)
	}
}

ModalContainer.propTypes = {
	modal: PropTypes.object.isRequired
}

export default ModalContainer;