import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';
import { connect } from 'preact-redux';

import reduce from '../../redux/reducers';
import * as actions from '../../redux/actions';

import Home from '../../routes/home';
import Info from '../../routes/info';
import About from '../../routes/about';
import Faq from '../../routes/faq';

import Header from '../header';
import Word from '../word';
import Ripple from '../ripple';
import EmailModal from '../email-modal';
import Snackbar from '../snackbar';

import WordManager from '../../managers/word-manager';
import StyleManager from '../../managers/style-manager';
import DimenManager from '../../managers/dimen-manager';

import style from './style';

if (module.hot) {
	require('preact/debug');
}

@connect(reduce, actions)
class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.setState({ otherRoute: e.url !== '/' });
		this.currentUrl = e.url;
	};

	onLinkClicked = (event) => {
		if(event.target.children && event.target.children[0] && event.target.children[0].click) {			
			event.target.children[0].click();
		}
	};

	onDragStart = () => {
		this.props.updateSelectedAngle(undefined);
		this.props.setWordVisibility(false);
	};

	onDragStop = () => {
		this.propeller.angle = Math.round(this.propeller.angle / this.props.step) * this.props.step;
		this.setAngle();
	};

	onResize = () => {
		this.updateDimensions();
	};

	onCtaClickHandler = event => {
		this.props.setModalVisibility(true);
	};

	onModalClose = event => {
		if(['oir_overlay', 'oir_overlay_close', 'oir_overlay_close_div', 'oir_overlay_close_svg', 'oir_overlay_close_path'].indexOf(event.target.id) >= 0) {
			this.props.setModalVisibility(false);
		}
	};

	onRefresh = () => {
		this.props.setWordVisibility(false);
		this.props.updateWordList(this.wordManager.getWordList(this.props.wordCount, true));
		this.props.setWordVisibility(true);
		gtag('event', 'view_item_list', { refersh : 'true' });
	};

	onWordClickHandler = () => {

		this.props.learnWord(this.props.word);

		if (this.snackTimeout) {
			clearTimeout(this.snackTimeout);
		}

		this.props.setWordVisibility(false);
		this.props.setSnackVisibility(true);

		setTimeout(() => {
			this.propeller.angle = Math.min(this.propeller.angle + this.props.step, 360);
			this.setAngle();
			this.props.updateWordList(this.wordManager.replaceWord(this.props.word));
			this.props.setWordVisibility(true);
		}, 200);

		this.snackTimeout = setTimeout(() => {
			this.props.setSnackVisibility(false);
		}, 2000);

		gtag('event', 'view_item', { item : this.props.wordManager });
	};

	setAngle() {
		let base = 360;

		if (this.propeller) {
			this.propeller.angle = Math.round(this.propeller.angle / this.props.step) * this.props.step;
			base = this.propeller.angle === 0 ? 360 : this.propeller.angle;
		}

		const angle = 360 - base;

		this.props.updateSelectedAngle(angle);
		this.props.setWordVisibility(true);
	}

	updateDimensions() {
		const { width, height, diameter, offset, wordCount, step } = DimenManager.getDimensions(window);
		this.props.updateDimensions(width, height, diameter, offset, wordCount, step);
		this.props.updateWordList(this.wordManager.getWordList(wordCount));
		setTimeout(() => {
			this.setAngle();
		}, 100);
	}

	componentDidMount() {
		this.wordManager = WordManager.getInstance(this.props.learnedWords);
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

	render({ width, height, diameter, offset, step, words, showMenu, showModal, showSnack, learnedWords, wordsLength }, { otherRoute }) {

		let snackbarContent;

		const appStyles = [style.oir_app];
		const { canvasStyle, innerStyle, contentStyle, pointerStyle, vertical } 
			= StyleManager.getStyles(width, height, diameter, offset);
		const radius = diameter / 2;
		const menuStyles = [style.oir_menu];

		if (otherRoute) {
			appStyles.push(vertical === true ? style.oir_app_other_route_vertical : style.oir_app_other_route_horizontal);
		}

		if (learnedWords.length >= wordsLength) {
			snackbarContent = 'You have learned all the words';
		} else {
			snackbarContent = `Irish words learned: ${learnedWords.length}`;
		}

		if (showMenu === true) {
			menuStyles.push(style.oir_menu_open);
		}

		return (
			<div class={appStyles.join(' ')}>
				<div class={style.oir_word_canvas} style={canvasStyle}>
					<div class={style.oir_word_rotate} style={innerStyle}>
						<div class={style.oir_word_inner} ref={c => this.canvas = c}>
							{words.map((item, idx) => (<Word wordAngle={idx * step} radius={radius} item={item} />))}
						</div>
					</div>
				</div>
				<div class={style.oir_content} style={contentStyle}>
					<div class={menuStyles.join(' ')}>
						<div onClick={this.onLinkClicked}>
							<Link href='/' />
							<Ripple dark={true} />
							Home
						</div>
						<div onClick={this.onLinkClicked}>
							<Link href='/about' />
							<Ripple dark={true} />
							About Us
						</div>
						<div onClick={this.onLinkClicked}>
							<Link href='/info' />
							<Ripple dark={true} />
							Why Irish?
						</div>
						<div onClick={this.onLinkClicked}>
							<Link href='/faq' />
							<Ripple dark={true} />
							FAQ
						</div>
					</div>
					<Header onRefresh={this.onRefresh} refreshShown={otherRoute} />
					<Router onChange={this.handleRoute}>
						<Home path='/' onWordClickHandler={this.onWordClickHandler} onCtaClickHandler={this.onCtaClickHandler} />
						<Info path='/info' />
						<About path='/about' />
						<Faq path='/faq' />
					</Router>
				</div>
				<svg class={style.oir_word_pointer} style={pointerStyle} viewBox="0 0 24 24">
					<path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
				</svg>
				<EmailModal open={showModal} onClose={this.onModalClose} />
				<Snackbar open={showSnack} color={style.oir_green_bg}>{snackbarContent}</Snackbar>
				<div class={style.oir_footer}>
					<a>&copy; Brian Gilmour {(new Date()).getFullYear()}</a>
					<a href='https://mutch.co' target='_blank'>Built by Tyler Mutch</a>
				</div>
			</div>
		);
	}
}

export default App;