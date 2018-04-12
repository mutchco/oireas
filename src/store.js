import { createStore } from 'redux';

const INITIAL = { };

const ACTIONS = {
	SELECT_WORD: ({ ...state }, { word, definition, languagePart, englishWord}) => ({
		...state,
		word,
		englishWord,
		languagePart,
		definition
	}),
	DESELECT_WORD: ({ ...state}) => ({
		...state,
		word: null,
		definition: null
	})
};

export default createStore((state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, typeof devToolsExtension==='function' ? devToolsExtension() : undefined);