import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import reduce from '../../reducers';
import * as actions from '../../actions';

import style from './style';

@connect(reduce, actions)
class Word extends Component {

	render({ item, angle, radius, selected, show }) {

		const styleClass = [style.oir_word, style.oir_word_changing];

		if (Math.round(angle) === Math.round(selected)) {
			this.props.selectWord(item);
			styleClass.push(style.oir_word_selected);

			if (show === false) {
				styleClass.push(style.oir_word_hidden);
			}
		}

		return (
			<div class={styleClass.join(' ')} style={`transform: rotate(${angle}deg) translate(${radius - 100}px)`} unselectable='on'>{item.word}</div>
		);
	}

}

export default Word;