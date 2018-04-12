import wordData from '../../words.json';

class WordManager {

	items = [];
	indexes = [];
	words = [];

	/**
    * Get a list of random words equal to the count
    * @param {Number} count - The number of words required
  	*/
	getWordList(count) {

		if (this.items.length === 0) {
			//Initialize word list	
			this.items = this.getWords(count);
		} else if (this.items.length > count) {
			//Remove words
			this.items = this.items.slice(0, count);
		} else if (this.items.length < count) {
			//Add words
			this.items = this.items.concat(this.getWords(count - this.items.length));
		}

		this.words = this.items.map(item => {
			return item.word;
		});

		return this.items;
	}

	getWords(count) {

		const items = [];

		for (let i = 0; i < count; i++) {
			const num = this.getRandom(this.indexes, wordData.words.length - 1);
			const item = wordData.words[num];
			items.push(item);
			this.indexes.push(num);
		}

		return items;
	}

	/**
    * Get random number between 0 and maxium with no duplicates
    * @param {Number[]} items - currently selected numbers, to prevent duplicates
    * @param {Number} maximum - the largest number the random can be
  	*/
	getRandom(items, maximum) {
		const random = this.getRandomWithin(0, maximum);

		if (items.indexOf(random) >= 0) {
			return this.getRandom(items, maximum);
		}

		return random;
	}

	/**
	* Get random number within min and max
	* @param {Number} min - The lowest number the random can be
	* @param {Number} max - the highest number the random can be
  */
  getRandomWithin(min, max) {
    return Math.floor(min + Math.random()*(max+1 - min))
  }

	replaceWord(word) {
		const newWord = this.getWords(1)[0];
		const idx = this.words.indexOf(word);
		this.items.splice(idx, 1, newWord);
		this.words.splice(idx, 1, newWord.word);
		return this.items;
	}

}

export default WordManager;