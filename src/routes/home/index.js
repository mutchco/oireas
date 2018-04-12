import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import reduce from '../../reducers';
import * as actions from '../../actions';

import WordManager from './word-manager';
import StyleManager from './style-manager';

import Header from '../../components/header';
import Word from '../../components/word';
import Ripple from '../../components/ripple';

import style from './style';

let step = 0;

@connect(reduce, actions)
class Home extends Component {

	constructor() {
		super();

		this.wordManager = new WordManager();
	}

	onDragStart = () => {
		this.setState({ angle: undefined, show: false });
	};

	onDragStop = () => {
		this.propeller.angle = Math.round(this.propeller.angle / step) * step;
		this.setAngle();
	};

	onResize = () => {
		this.updateDimensions();
		this.updateWords();
		this.setAngle();
	};

	onWordClickHandler = () => {
		this.setState({ show: false });
		setTimeout(() => {
			this.setState({ words: this.wordManager.replaceWord(this.props.word), show: true });
		}, 200);
	};

	onCtaClickHandler = (event) => {
		console.log(event);
	};

	setAngle() {
		let base = 360;

		if (this.propeller) {
			this.propeller.angle = Math.round(this.propeller.angle / step) * step;
			base = this.propeller.angle === 0 ? 360 : this.propeller.angle;
		}

		const angle = 360 - base;

		this.setState({ angle, show: true });
	}

	updateDimensions() {

		const width = Math.max(window.innerWidth, 500);
		const height = Math.max(window.innerHeight, 500);
		const diameter = Math.min(width, height);
		const offset = height >= width ? 90 : 0;

		this.setState({ width, height, diameter, offset });
	}

	updateWords() {
		const wordCount = Math.round((this.state.diameter * Math.PI) / (32 * Math.PI) / 4) * 4;
		this.setState({ words: this.wordManager.getWordList(wordCount) });
	}

	componentWillMount() {
		this.onResize();
	}

	componentDidMount() {
		this.propeller = new Propeller(this.canvas, {
			inertia: 0,
			onDragStart: this.onDragStart,
			onDragStop: this.onDragStop
		});
		window.addEventListener("resize", this.onResize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onResize);
	}

	render({ word, englishWord, languagePart, definition }, { width, height, diameter, angle, offset, words, show }) {

		const infoStyles = [style.oir_word_column];
		const { canvasStyle, innerStyle, contentStyle, pointerStyle } = StyleManager.getStyles(width, height, diameter, offset);
		const radius = diameter / 2;

		step = 360 / words.length;

		if (show === false) {
			infoStyles.push(style.oir_word_dragging);
		}

		return (
			<div class={style.oir_home}>
				<div class={style.oir_word_canvas} style={canvasStyle}>
					<div class={style.oir_word_rotate} style={innerStyle}>
						<div class={style.oir_word_inner} ref={c => this.canvas = c}>
							{words.map((item, idx) => (<Word angle={idx * step} radius={radius} item={item} selected={angle} show={show} />))}
						</div>
					</div>
				</div>
				<div class={style.oir_word_content} style={contentStyle}>
					<Header />

					<div class={infoStyles.join(' ')}>

						<div class={style.oir_word_row}>

							<div class={style.oir_word_info}>						
								<h2>{word}</h2>
								<h2>{englishWord}</h2>
								<h4>{languagePart}</h4>
							</div>

							<div class={style.oir_word_button} onClick={this.onWordClickHandler}>
								<Ripple dark={true} />
								<svg style="width:24px;height:24px" viewBox="0 0 24 24">
									<path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
								</svg>
							</div>

						</div>	
						<p>{definition}</p>					
						<div class={style.oir_cta_button} onClick={this.onCtaClickHandler}>
							<Ripple />
							Learn more Irish!
						</div>

					</div>
				</div>
				<svg class={style.oir_word_pointer} style={pointerStyle} viewBox="0 0 24 24">
					<path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
				</svg>
			</div>
		);
	}
}

export default Home;