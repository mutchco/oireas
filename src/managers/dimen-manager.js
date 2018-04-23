class DimenManager {

	static getDimensions(window) {

		const width = Math.max(window.innerWidth, 500);
		const height = Math.max(window.innerHeight, 500);
		const diameter = Math.min(width, height);
		const offset = height >= width ? 90 : 0;
		const wordCount = Math.round((diameter * Math.PI) / (32 * Math.PI) / 4) * 4;
		const step = 360 / wordCount;

		return { width, height, diameter, offset, wordCount, step };
	}
}

export default DimenManager;