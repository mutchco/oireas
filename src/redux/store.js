import { createStore } from 'redux';
import DimenManager from '../managers/dimen-manager';
import WordManager from '../managers/word-manager';

import { lsTest, debounce } from '../utils.js';

const LEARNED_KEY = 'LEARNED_KEY';

const INITIAL = (() => {

	const wordManager = WordManager.getInstance(learnedWords);

	const text = localStorage.getItem(LEARNED_KEY);
	const learnedWords = text === null ? [] : JSON.parse(text);
	const dimens = DimenManager.getDimensions(window);
	const words = wordManager.getWordList(dimens.wordCount);
	const wordsLength = wordManager.getWordCount();

	return {
		angle: 0,
		...dimens,
		learnedWords,
		wordsLength,
		words
	}

})();

const ACTIONS = {
	SELECT_WORD: ({ ...state }, { word, definition, languagePart, phonetic, englishWord}) => ({
		...state,
		word,
		englishWord,
		languagePart,
		phonetic,
		definition
	}),
	LEARN_WORD: ({ learnedWords, ...state }, { word }) => ({
		...state,
		learnedWords: learnedWords.concat([word])
	}),
	INIT_LEARNED: ({ ...state }, { learnedWords }) => ({
		...state,
		learnedWords
	}),
	UPDATE_WORDS: ({ ...state }, { words }) => ({
		...state,
		words
	}),
	UPDATE_DIMEN: ({ ...state }, { width, height, diameter, offset, wordCount, step }) => ({
		...state,
		width,
		height,
		diameter,
		offset,
		step,
		wordCount
	}),
	UPDATE_ANGLE: ({ ...state }, { angle }) => ({
		...state,
		angle
	}),
	SET_MENU_VIS: ({ ...state }, { showMenu }) => ({
		...state,
		showMenu
	}),
	SET_MODAL_VIS: ({ ...state }, { showModal }) => ({
		...state,
		showModal
	}),
	SET_WORD_VIS: ({ ...state }, { showWord }) => ({
		...state,
		showWord
	}),
	SET_SNACK_VIS: ({ ...state }, { showSnack }) => ({
		...state,
		showSnack
	})
};

const store = createStore((state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, typeof devToolsExtension==='function' ? devToolsExtension() : undefined);

if (lsTest() === true) {

	const saveLearned = debounce(() => {
		const words = store.getState().learnedWords;
		if (words.length > 0) {
			const text = JSON.stringify(words);
			localStorage.setItem(LEARNED_KEY, text);
		}
	}, 200);

	store.subscribe(saveLearned);
}

export default store;