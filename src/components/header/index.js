import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

import Ripple from '../ripple';

class Header extends Component {

	render() {

		return (
			<div class={style.oir_header}>
				<div class={style.oir_header_left}>
					<div class={style.oir_header_button}>
						<Ripple dark={true} />
						<svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
						</svg>
					</div>
					<span>Oireas</span>
				</div>
				<div class={style.oir_header_button}>
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