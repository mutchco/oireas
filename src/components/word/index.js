import { h, Component } from 'preact';

import style from './style.css';

class Word extends Component {

	render({ children }) {
		return (
			<div class={style.oir_word}>
				<div class={style.oir_word_bg}></div>
				<div class={style.oir_word_text}>
					{children}
				</div>
			</div>
		);
	}
}

export default Word;