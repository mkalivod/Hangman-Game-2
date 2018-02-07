function Letter(letter) {

	this.letter = letter;

	if (this.letter == ',') {
			this.display = ','
	}else if (this.letter == "'"){
		this.display = "'"
	}else if (this.letter == '.'){
		this.display = '.'
	}else if (this.letter == '-'){
		this.display = '-'
	}else if (this.letter == ' '){
		this.display = ' '
	}else {
		this.display = '_'
	}	
}

module.exports = Letter;