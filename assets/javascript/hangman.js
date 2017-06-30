

function gameMain(){

	// var djList: ["MARTIN GARRIX", "HARDWELL", "ARMIN VAN BUUREN", "TIESTO", "DAVID GUETTA", "STEVE AOKI", "OLIVER HELDENS", "SKRILLEX", "AFROJACK", "AVICII", "CALVIN HARRIS", "ZED", "THE CHAINSMOKERS", "KYGO"],

	var djList =["MARTIN GARRIX", "HARDWELL", "ARMIN VAN BUUREN"];

	var gameObject = {
		solutionArray: djList[Math.floor(Math.random()*djList.length)],
		displayArray: [],
		rightArray: [],
		wrongArray: [],
		guessedArray: [],
		lives: 13,
		currentLetter: ""
	};


	var winDisplay = document.getElementById("winDisplay");
	var currentWordDisplay = document.getElementById("currentWordDisplay");
	var remainingGuessDisplay = document.getElementById("remainingGuessDisplay");
	var guessListDisplay = document.getElementById("guessListDisplay");
	var showStatus = document.getElementById("showStatus");



	//check if the letters in solution are in the alphabet, so people don't have to guess numbers/hyphens/spaces

 	var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S','T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


 	// substituting letters in solutionArray with "_"
 	for(var i=0; i<gameObject.solutionArray.length; i++){
 		if(alphabet.indexOf(gameObject.solutionArray[i]) === -1){
 			gameObject.displayArray.push(gameObject.solutionArray[i]);
 		} else {
 			gameObject.displayArray.push("_");
 		}
 	}

 	// displayArray.innerHTML
 	currentWordDisplay.innerHTML = gameObject.displayArray.join("");

 	console.log("ready to start game");
 	console.log("solution: " + gameObject.solutionArray);


	///////////// onkeyup
	document.onkeyup = function (event) {

		var input = event.key;
		console.log("input: " + input);
		//convert userinput to UpperCase and store it in currentLetter
		var guess = input.toUpperCase();
		console.log("currentLetter: " + guess);

		if(gameObject.guessedArray.indexOf(guess) != -1){
			//if letter is already guessed, update showStatus
			showStatus.innerHTML = "You have already guessed " + guess + ". Try again.";
		} else {
			//if not, play game
			showStatus.innerHTML = "";
			gameObject.guessedArray.push(guess);
			guessListDisplay.innerHTML = gameObject.guessedArray.join(" &middot; ");

			if(gameObject.solutionArray.indexOf(guess) === -1){
				//if guess is not in solutionArray
				// decrement lives, add guess to wrongArray

				gameObject.lives--;
				remainingGuessDisplay.innerHTML = gameObject.lives;
				showStatus.innerHTML = "There is no " + guess;

				if(gameObject.lives < 1){
					//if lives go down under 1
					showStatus.innerHTML = "GAME OVER";
					currentWordDisplay.innerHTML = gameObject.solutionArray;

					//************ need to restart the game
				}
			} else {
				//if guess is in solutionArray
				//push into rightArray
				remainingGuessDisplay.innerHTML = gameObject.lives;
				showStatus.innerHTML = guess + " works!";
				gameObject.rightArray.push(guess);

				//update displayArray with right guess
				for(var j=0; j<gameObject.solutionArray.length; j++){
					if(gameObject.solutionArray[j] === guess){
						gameObject.displayArray[j] = guess;
					}
				}
				currentWordDisplay.innerHTML = gameObject.displayArray.join("");

				if(gameObject.displayArray.indexOf("_") === -1){
					//if displayArray doesn't have any "_", win the game
					showStatus.innerHTML = "YOU GOT IT!";
					currentWordDisplay.innerHTML = gameObject.solutionArray;

					//************ need to restart the game
				}
			}
		}
	};
}

window.onLoad = gameMain();
