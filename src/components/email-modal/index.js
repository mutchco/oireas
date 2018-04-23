import { h, Component } from 'preact';

import validate from '../../validate';

import Ripple from '../ripple';

import style from './style';

class EmailModal extends Component {

	onSubmit = event => {

		this.setState({ errors: {}, loading: true });

		if (event.preventDefault) {
			event.preventDefault();
		}

		const { valid, errors, values } = validate(this.state);

		if (valid === false) {
			this.setState({ errors, loading: false });
			return;
		}

		fetch('https://app.mutch.co/email/oireas', {
			body: JSON.stringify(values),
	    headers: {
	      'content-type': 'application/json',
	      'x-api-key': 'YKzriQCmqa33NEZgdxHUI75WK6SLZAiK70ZrSh6b'
	    },
	    credentials: 'include',
	    method: 'POST'
		})
		.then(response => response.json())
		.then(data => {
			if (data.success === true) {
				this.setState({
					loading: false,
					sender: '',
					name: '',
					message: '',
					successMsg: data.message
				});
				gtag('event', 'generate_lead', { email_sent: (new Date()).toString() });
			} else {
				this.setState({
					loading: false,
					errors: {
						api: data.message
					}
				});
			}
		})
		.catch(err => {
				this.setState({
					loading: false,
					errors: {
						api: err.message
					}
				});
		});
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};

	render({ open, onClose }, { sender, name, message, loading, errors = {}, successMsg = '' }) {

		const overlayStyle = [style.oir_email_overlay];
		const modalStyle = [style.oir_email_modal];

		let button = (<button type='submit' class='oir_button'>
										<Ripple />
										Submit
									</button>);

		if (!open) {
			overlayStyle.push(style.oir_email_overlay_closed);
		} else {
			overlayStyle.push(style.oir_email_overlay_open);
		}

		if (!open) {
			modalStyle.push(style.oir_email_modal_closed);
		} else {
			modalStyle.push(style.oir_email_modal_open);
		}

		if (loading === true) {
			button = (<svg version="1.1" id="loader-1" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40">
								  <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
								    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
								    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
								  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
								    C22.32,8.481,24.301,9.057,26.013,10.047z">
								    <animateTransform attributeType="xml"
								      attributeName="transform"
								      type="rotate"
								      from="0 20 20"
								      to="360 20 20"
								      dur="0.5s"
								      repeatCount="indefinite"/>
								 </path>
							 </svg>);
		}

		return (
			<div class={overlayStyle.join(' ')} id='oir_overlay' onClick={onClose}>
				<div class={modalStyle.join(' ')}>
					<div class={style.oir_svg_close} id='oir_overlay_close'>
						<div id='oir_overlay_close_div'>
							<Ripple />
							<svg class={style.oir_svg_close} style="width:24px;height:24px" viewBox="0 0 24 24" id='oir_overlay_close_svg'>
								<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" id='oir_overlay_close_path' />
							</svg>
						</div>
					</div>
					<div class={style.oir_modal_header}>
						<h2>Ask about lessons</h2>
						<p>Enter your details below and we'll get back to you right away</p>
					</div>
					<form onSubmit={this.onSubmit}>
						<label>Your email*</label>
						<input type='text' name='sender' onInput={this.onChange} value={sender} />
						<p class={style.oir_error}>{errors.sender}</p>
						<label>Your name*</label>
						<input type='text' name='name' onInput={this.onChange} value={name} />
						<p class={style.oir_error}>{errors.name}</p>
						<label>Any questions or comments</label>
						<textarea name='message' onInput={this.onChange} value={message}>{message}</textarea>
						<p class={style.oir_error}>{errors.message}</p>
						{button}
						<p class={style.oir_error}>{errors.api}</p>
						<p class={style.oir_success}>{successMsg}</p>
					</form>
				</div>
			</div>
		);
	}
}

export default EmailModal;