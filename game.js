var Letter = require('./letter.js');
var Word = require('./word.js');
var inquirer = require('inquirer');
var Game = require('./game.js');
var figlet = require('figlet');


// Set Global Variables
var guessesLeft = 5;
var playerGuesses = [];
var playerMisses = [];


// Global Functions ///////////////////////////////////////////////////////
var validateGuess = function(guess){

	// console.log('validating guess ' + guess)

	var regex=/[^a-zA-Z]+$/;

	if (guess == null) {
		// console.log('if null')
		return {
			"valid":false, 
			"error":"You must input a letter."
		}
		

	}else if (guess.match(regex)) {
		// console.log('if not a letter')
		return {
			"valid":false,
			"error":"Guess must be a letter."
		}
		
	} else if (guess.length > 1) {
		// console.log('if more than one letter')
		return {
			"valid": false,
			"error": "You can only guess one letter at a time."
		}

	} else if (playerGuesses.indexOf(guess) > -1) {
		// console.log('if already in guesses')
		return {
			"valid": false,
			"error": "You already guessed that letter."
		}

	}else if (guess.length < 1) {
		// console.log('if no input')
		return {
			"valid": false,
			"error": "You must input a letter."
		}
		
	}else{

		// console.log('valid guess!')
		return {
			"valid": true,
			"error": "none"
		}
	}

}

// Inquirer Prompts ///////////////////////////////////////////////////////
var mainPrompt = 
	{
		type: "list",
		name: "choice",
		message: "What do you want to do?",
		choices: ["Guess a letter.", "Give up - New Puzzle.", "Exit."]
	}

var guessLetterPrompt = {name: "guess", message: "What letter would you like to guess?"}

var newGamePrompt = {type: "confirm", name: "choice", message: "New Game?"}
// Prompt Functions ///////////////////////////////////////////////////////
function main() {

	inquirer.prompt(mainPrompt).then(function(answers){

		if (answers.choice == "Guess a letter.") {

			guessLetter();

		}else if (answers.choice == "Give up - New Puzzle."){

			displaySolution();
			newGame();

		}else if (answers.choice == "Exit."){
			process.exit();
		}
	})
}

function guessLetter() {

	inquirer.prompt(guessLetterPrompt).then(function(answers){


		var guess = validateGuess(answers.guess)

		// console.log(guess)

		if (guess.valid) {

			// console.log('Guess Valid!')

			// logic when a correct guess is submitted
			if(puzzle.checkGuess(answers.guess)){
				playerGuesses.push(answers.guess);
				puzzle.updateLetters(answers.guess);

				if(winCheck()){
					puzzle.displayWord();
					// console.log("\nYou Win!\n")
					console.log(figlet.textSync('You Win!', {
						font: 'Star Wars',
						horizontalLayout: 'default',
						verticalLayout: 'default'
					}));
					console.log('\n');
					newGame();
				}else{

					displayHangman();
					puzzle.displayWord();
					displayGuessedLetters();
					main();		
				}
				

			// logic when an incorrect guess is submitted
			}else {
				guessesLeft -= 1;
				playerMisses.push(answers.guess);
				playerGuesses.push(answers.guess);
				// if player is out of guesses
				
				if(loseCheck()){
					// console.log('\nYou lose!\n');
					console.log(figlet.textSync('You Lose!', {
						font: 'Star Wars',
						horizontalLayout: 'default',
						verticalLayout: 'default'
					}));
					console.log('\n');
					
					displayHangman();
					displaySolution();
					newGame();
				// if player has guesses remaining
				}else{
					displayHangman();
					puzzle.displayWord();
					displayGuessedLetters();
					main();
				}
			}
		// guess is invalid
		}else {

			console.log('\n' + guess.error + '\n')
			displayHangman();
			puzzle.displayWord();
			displayGuessedLetters();
			main();
		}
	})
}


// Display Functions //////////////////////////////////////////////////////
function displayTitle() {
	console.log(figlet.textSync('Hanged!', {
		font: 'Star Wars',
		horizontalLayout: 'default',
		verticalLayout: 'default'
	}));
}


function displaySolution() {

	console.log("\nThe word was...\n")
	console.log("\n======================================\n")
	console.log(puzzle.word)
	console.log("\n======================================\n")

}

function displayGuessedLetters(){

	var guessedLetters = ''

	for (i=0; i < playerMisses.length ; i++){

		guessedLetters += playerMisses[i] + ' ';

	}


	console.log('\nGuessed Letters: ' + guessedLetters + '\n');
	console.log('Lives Remaining: ' + guessesLeft + '\n')

}

function displayHangman(){

	switch(guessesLeft) {

		case 5:
			console.log('              ')
			console.log(' -----------   ')
			console.log(' |         |  ')
			console.log(' |             ')
			console.log(' |             ')
			console.log(' |             ')
			console.log(' |             ')
			console.log(' |             ')
			console.log(' |             ')
			console.log('--------------')
			break;

		case 4:
			console.log('              ')
			console.log(' -----------   ')
			console.log(' |         |  ')
			console.log(' |         @  ')
			console.log(' |             ')
			console.log(' |             ')
			console.log(' |             ')
			console.log(' |             ')
			console.log(' |             ')
			console.log('--------------')
			break;

		case 3:
			console.log('              ')
			console.log(' -----------   ')
			console.log(' |         |  ')
			console.log(' |         @  ')
			console.log(' |         |  ')
			console.log(' |             ')
			console.log(' |             ')
			console.log(' |             ')
			console.log(' |             ')
			console.log('--------------')
			break;

		case 2:
			console.log('              ')
			console.log(' -----------   ')
			console.log(' |         |  ')
			console.log(' |         @  ')
			console.log(' |        /|\\ ')
			console.log(' |             ')
			console.log(' |             ')
			console.log(' |             ')
			console.log(' |             ')
			console.log('--------------')
			break;

		case 1:
			console.log('              ')
			console.log(' -----------   ')
			console.log(' |         |  ')
			console.log(' |         @  ')
			console.log(' |        /|\\ ')
			console.log(' |        / \\ ')
			console.log(' |             ')
			console.log(' |             ')
			console.log(' |             ')
			console.log('--------------')
			break;

		case 0:
			console.log('              ')
			console.log(' -----------   ')
			console.log(' |         |  ')
			console.log(' |         |  ')
			console.log(' |         @  ')
			console.log(' |        /|\\ ')
			console.log(' |        / \\ ')
			console.log(' |             ')
			console.log(' |             ')
			console.log('--------------')
			break;

	}	
}

// Game Functions /////////////////////////////////////////////////////////
function winCheck(word) {

	// if a word is passed, check the whole word
	if (word) {

		var workingPuzzle = word;

	// if not, check only the currently guessed letters
	}else{

		var workingPuzzle = puzzle.wordStatus();

	}

	if (workingPuzzle == puzzle.word){
		// player wins
		return true
	}
}

function loseCheck() {

	if (guessesLeft <= 0) {

		return true
	}
}

function newGame() {

	inquirer.prompt(newGamePrompt).then(function(answers){

		if(answers.choice == true) {

			guessesLeft = 5;
			playerGuesses = [];
			playerMisses = [];
			puzzle = Game.newPuzzle();

			displayTitle();
			displayHangman();
			puzzle.displayWord();
			main();

		}else{
			process.exit;
		}
	})
}

// Load Puzzle
var puzzle = Game.newPuzzle();

// Intro screen
// console.log("\nWelcome to Hangman!");
displayTitle();

// Display the puzzle

displayHangman();
puzzle.displayWord();

// prompt player for input

main();



