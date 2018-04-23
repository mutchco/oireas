import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import reduce from '../../redux/reducers';
import * as actions from '../../redux/actions';

import style from './style';

@connect(reduce, actions)
class Word extends Component {

	render({ item, angle, wordAngle, radius, showWord }) {

		const styleClass = [style.oir_word, style.oir_word_changing];

		if (Math.round(wordAngle) === Math.round(angle)) {
			this.props.selectWord(item);
			styleClass.push(style.oir_word_selected);

			if (showWord === false) {
				styleClass.push(style.oir_word_hidden);
			}
		}

		return (
			<div class={styleClass.join(' ')} style={`transform: rotate(${wordAngle}deg) translate(${radius - 100}px)`} unselectable='on'>{item.word}</div>
		);
	}

}

export default Word;