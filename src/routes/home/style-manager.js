class StyleManager {

	static getStyles(width, height, diameter, offset) {
		
		const canvasStyle = {};
		const innerStyle = {};
		const contentStyle = {};
		const pointerStyle = { width: '24px', height: '24px' };

		innerStyle.width = diameter + 'px';
		innerStyle.height = diameter + 'px';

		if (height >= width) {

			canvasStyle.width = '100%';
			canvasStyle.height = '50%';

			innerStyle.left = `-${(width - window.innerWidth) / 2}px`;
			innerStyle.top = `-${diameter - (window.innerHeight / 2)}px`;

			contentStyle.width = '100%';
			contentStyle.height = 'calc(50% - 8px)';
			contentStyle.bottom = 0;

			pointerStyle.top = '50%';
			pointerStyle.left = 'calc(50% - 12px)';
			pointerStyle.margin = '-12px 0 0 0';


		} else if (width > height) {

			canvasStyle.width = `50%`;
			canvasStyle.height = '100%';

			contentStyle.width = 'calc(50% - 40px)';
			contentStyle.height = 'calc(100% - 32px)';
			contentStyle.right = 0;

			innerStyle.left = '-' + (height - (width / 2)) + 'px';
			innerStyle.top = `-${(height - window.innerHeight) / 2}px`;

			pointerStyle.top = 'calc(50% - 12px)';
			pointerStyle.left = '50%';
			pointerStyle.transform = 'rotate(-90deg)';
			pointerStyle.margin = '0 0 0 -12px';
		}

		if (offset > 0) {
			innerStyle.transform = `rotate(${offset}deg)`
		}

		return { canvasStyle, innerStyle, contentStyle, pointerStyle };
	}
}

export default StyleManager;