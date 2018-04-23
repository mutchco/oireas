import wordData from '../words.json';

let wordManagerInstance;

class WordManager {

	items = [];

	/**
  * Gets the singleton instance of the word manager and creates the word item index
  * without the supplied learned words
  * @param {String[]} learnedWords - A list of words that have been previously learned
  * @returns {WordManager} The singleton instance of the word manager
  */
	static getInstance(learnedWords) {

		if (wordManagerInstance === undefined) {
			wordManagerInstance = new WordManager();
			wordManagerInstance.generateWordIndex(learnedWords);
		}

		return wordManagerInstance;
	}

	/**
  * Get a list of random words equal to the count
  * @param {Number} count - The number of words required
  */
	getWordList(count, refresh) {

		if (this.items.length === 0) {
			//Initialize word list	
			this.items = this.getWords(count);
		} else if (refresh === true) {
			//Refreshes the current word list, adds the items back to the index
			const items = this.items;
			this.items = this.getWords(count);
			this.wordIndex = this.wordIndex.concat(items);
		} else if (this.items.length > count) {
			//Remove words
			const removed = this.items.splice(count, this.items.length - count);
			this.wordIndex = this.wordIndex.concat(removed);
		} else if (this.items.length < count) {
			//Add words
			this.items = this.items.concat(this.getWords(count - this.items.length));
		}

		return this.items;
	}

	/**
	* Gets a random list of word items from the word index
	* @param {Number} count - The desired length of the random list
	* @returns {Object[]} The list of random word items
  */
	getWords(count) {

		if(this.wordIndex.length < count) {
			this.generateWordIndex();
		} 


		const items = [];

		for (let i = 0; i < count; i++) {
			const random = this.getRandomWithin(0, this.wordIndex.length - 1);
			const slice = this.wordIndex.splice(random, 1);
			items.push(slice[0]);
		}

		return items;	
	}

	/**
	* Get random number within min and max
	* @param {Number} min - The lowest number the random can be
	* @param {Number} max - the highest number the random can be
	* @returns {Number} The random number
  */
  getRandomWithin(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  /**
	* Replaces the supplied word item with a new one
	* @param {String} word - The word to replaced
	* @returns {String[]} The newly updated word item list
  */
	replaceWord(word) {

		const idx = this.items.findIndex(obj => obj.word === word);
		this.items.splice(idx, 1, this.getWords(1)[0]);
		return this.items;
	}

  /**
	* Generates the word index, removing any already learned words
	* @param {String[]} learnedWords - An array of already learned words
  */
  generateWordIndex(learnedWords) {

  	if (learnedWords === undefined) {
  		this.wordIndex = wordData.words;
  	} else {
	  	this.wordIndex = wordData.words
				.filter(item => {
					return learnedWords.indexOf(item.word) < 0;
				});
		}
  }

	/**
  * Get count of total words
  * @returns {Number} - The word count
  */
  getWordCount() {
  	return wordData.words.length; 	
  }

}

export default WordManager;