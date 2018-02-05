var Letter = require('./letter.js')

function Word(word) {

	this.word = word;
	this.letters = [];
	this.workingPuzzle = '';

	for (letter = 0; letter < word.length; letter++){
		var char = new Letter(word[letter]);
		this.letters.push(char);
	}

	// method checks user input against word and returns boolean
	this.checkGuess = function(guess) {

		if (this.word.includes(guess)){

			return true
		}else {

			return false
		}
	}

	// updates letter display to change '_' to the letter
	this.updateLetters = function(guess) {

		for (i=0; i < this.letters.length; i++){
			var letter = this.letters[i];

			if (guess == letter.letter) {
				letter.display = letter.letter;

			}
		}
	}

	this.wordStatus = function() {
		this.workingPuzzle = '';
		
		for (i=0; i < this.letters.length; i++){
			
			this.workingPuzzle += this.letters[i].display
		}
		return this.workingPuzzle;
	}

	this.displayWord = function(){

		var word = "";
		
		for (i = 0; i < this.letters.length; i++){
			var letter = this.letters[i];
			word += letter.display;
			word += ' ';

		}
		console.log("\n======================================\n")
		console.log('\n' + word + '\n')
		console.log("\n======================================\n")

	}
}

module.exports = Word;