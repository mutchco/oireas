import { h, Component } from 'preact';

import style from './style';

class Snackbar extends Component {

	render({ open, color, children }) {

		const styleClass = [style.oir_snackbar];

		if (open === true) {
			styleClass.push(style.oir_snackbar_open);
		}

		if (color) {
			styleClass.push(color);
		}

		return (
			<div class={styleClass.join(' ')}>
				{children}
			</div>
		);
	}
}

export default Snackbar;