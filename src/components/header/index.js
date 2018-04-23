import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import reduce from '../../redux/reducers';
import * as actions from '../../redux/actions';

import Ripple from '../ripple';

import style from './style';

@connect(reduce, actions)
class Header extends Component {

	onMenuClick = () => {
		this.props.setMenuVisibility(true);
		requestAnimationFrame(() => {
			document.body.addEventListener('click', this.onClickOff, true);
		});
	};

	onClickOff = (event) => {
		this.props.setMenuVisibility(false);
		document.body.removeEventListener('click', this.onClickOff);
	};

	render({ onRefresh, refreshShown }) {

		const refreshStyles = [style.oir_header_button];

		if (refreshShown === true) {
			refreshStyles.push(style.oir_hide_refresh);
		}

		return (
			<div class={style.oir_header}>
				<div class={style.oir_header_left}>
					<div class={style.oir_header_button} onClick={this.onMenuClick}>
						<Ripple dark={true} />
						<svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
						</svg>
					</div>
					<h1>Oireas</h1>
				</div>
				<div class={refreshStyles.join(' ')} onClick={onRefresh}>
					<Ripple dark={true} />
					<svg style="width:24px;height:24px" viewBox="0 0 24 24">
						<path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
					</svg>
				</div>
			</div>
		);
	}
}

export default Header;