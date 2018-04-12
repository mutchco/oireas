export function selectWord(wordItem) {
	return {
		type: 'SELECT_WORD',
		...wordItem
	};
}

export function deselectWord() {
	return {
		type: 'DESELECT_WORD'
	}
}