export function selectWord(wordItem) {
	return {
		type: 'SELECT_WORD',
		...wordItem
	};
}

export function learnWord(word) {
	return {
		type: 'LEARN_WORD',
		word
	};
}

export function updateWordList(words) {
	return {
		type: 'UPDATE_WORDS',
		words
	};
}

export function updateDimensions(width, height, diameter, offset, wordCount, step) {
	return {
		type: 'UPDATE_DIMEN',
		width,
		height,
		diameter,
		offset,
		step,
		wordCount
	};
}

export function updateSelectedAngle(angle) {
	return {
		type: 'UPDATE_ANGLE',
		angle
	};
}

export function setMenuVisibility(showMenu) {
	return {
		type: 'SET_MENU_VIS',
		showMenu
	}
}

export function setModalVisibility(showModal) {
	return {
		type: 'SET_MODAL_VIS',
		showModal
	};
}

export function setWordVisibility(showWord) {
	return {
		type: 'SET_WORD_VIS',
		showWord
	};
}

export function setSnackVisibility(showSnack) {
	return {
		type: 'SET_SNACK_VIS',
		showSnack
	};
}