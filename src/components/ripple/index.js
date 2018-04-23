import { h, Component } from 'preact';

import style from './style';

class Ripple extends Component {

	constructor() {
		super();

		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(event) {
		this.ripple.classList.remove(style.oir_ripple_open);
		this.ripple.style.left = (event.offsetX - (this.ripple.clientWidth / 2)) + 'px';
		this.ripple.style.top = (event.offsetY - (this.ripple.clientHeight / 2)) + 'px';
		this.ripple.classList.add(style.oir_ripple_open);
	}

	componentDidMount() {
		this.parent = this.base.parentNode;
		this.parent.style.position = 'relative';
		this.parent.style.overflow = 'hidden';

		const diameter = Math.max(this.parent.clientHeight, this.parent.clientWidth);
		this.ripple.style.width = diameter + 'px';
		this.ripple.style.height = diameter + 'px';

		// this.parent.addEventListener('click', this.clickHandler, false);
		this.parent.onclick = this.clickHandler;
	}
 
	render({ dark }) {

		const styleClass = [style.oir_ripple];

		if (dark === true) {
			styleClass.push(style.oir_ripple_dark);
		}

		return (
			<div class={styleClass.join(' ')} ref={r => this.ripple = r}></div>
		);
	}
}

export default Ripple;