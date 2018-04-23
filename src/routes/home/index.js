import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import reduce from '../../redux/reducers';
import * as actions from '../../redux/actions';

import Ripple from '../../components/ripple';

import style from './style';

@connect(reduce, actions)
class Home extends Component {

	render({ word, englishWord, languagePart, phonetic, definition, showWord, onWordClickHandler, onCtaClickHandler }) {

		const infoStyles = [style.oir_word_column];

		if (showWord === false) {
			infoStyles.push(style.oir_word_dragging);
		}

		return (
			<div class={style.oir_home}>
				<div class={infoStyles.join(' ')}>

					<div class={style.oir_word_row}>

						<div class={style.oir_word_info}>						
							<h2>{word}</h2>
							<h4>({phonetic})</h4>
							<h2>{englishWord}</h2>
						</div>

						<div class={style.oir_word_button} onClick={onWordClickHandler}>
							<Ripple dark={true} />
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
								<path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
							</svg>
						</div>

					</div>	
					<p>{definition}</p>					
					<button type='button' class={`oir_button ${style.oir_cta_button}`} onClick={onCtaClickHandler}>
						<Ripple />
						Learn more Irish
					</button>
				</div>
			</div>
		);
	}
}

export default Home;