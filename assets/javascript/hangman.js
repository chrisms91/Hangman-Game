

function gameMain(){

	// var djList: ["MARTIN GARRIX", "HARDWELL", "ARMIN VAN BUUREN", "TIESTO", "DAVID GUETTA", "STEVE AOKI", "OLIVER HELDENS", "SKRILLEX", "AFROJACK", "AVICII", "CALVIN HARRIS", "ZED", "THE CHAINSMOKERS", "KYGO"],

	var winDisplay = document.getElementById("winDisplay");
	var currentWordDisplay = document.getElementById("currentWordDisplay");
	var remainingGuessDisplay = document.getElementById("remainingGuessDisplay");
	var guessListDisplay = document.getElementById("guessListDisplay");
	var showStatus = document.getElementById("showStatus");
	var playListDisplay = document.getElementById("list");

	var djList =["MARTIN GARRIX", "HARDWELL", "ARMIN VAN BUUREN", "TIESTO", "DAVID GUETTA", "STEVE AOKI", "SKRILLEX", "CALVIN HARRIS", "THE CHAINSMOKERS", "KYGO"];
	var musicList = ["ANIMALS BY MARTIN GARRIX", "SPACEMAN BY HARDWELL", "GREAT SPIRIT BY ARMIN VAN BUUREN", "THE ONLY WAY IS UP BY TIESTO", "2U BY DAVID GUETTA", "TURBULENCE BY STEVE AOKI", "BANGARANG BY SKRILLEX", "HOW DEEP IS YOUR LOVE BY CALVIN HARRIS", "CLOSER BY THE CHAINSMOKERS", "FIRESTONE BY KYGO"];

	var gameObject = {
		solutionArray: [],
		displayArray: [],
		rightArray: [],
		wrongArray: [],
		guessedArray: [],
		musicPlaying: "",
		lives: 13,
		currentLetter: "",
		wins: 0,
		currentSol: 0,
		prevSol: 0,
		playList: ['assets/audio/martin-garrix.mp3', 'assets/audio/hardwell.mp3', 'assets/audio/armin-van-buuren.mp3', 'assets/audio/tiesto.mpe', 'assets/audio/david-guetta.mp3', 'assets/audio/steve-aoki.mp3', 'assets/audio/skrillex.mp3', 'assets/audio/calvin-harris.mp3', 'assets/audio/the-chainsmokers.mp3', 'assets/audio/kygo.mp3'],
		audio: new Audio(),

		reset: function(){
			//clear arrays
			gameObject.displayArray = [];
			gameObject.rightArray = [];
			gameObject.guessedArray = [];
			guessListDisplay.innerHTML = "";

			//re-pick solution
			gameObject.currentSol = Math.floor(Math.random()*djList.length);
			gameObject.solutionArray = djList[gameObject.currentSol];

			console.log("Solution: " + gameObject.solutionArray);

			//reset display
		 	for(var i=0; i<gameObject.solutionArray.length; i++){
		 		if(alphabet.indexOf(gameObject.solutionArray[i]) === -1){
		 			gameObject.displayArray.push(gameObject.solutionArray[i]);
		 		} else {
		 			gameObject.displayArray.push("_");
		 		}
		 	}
		 	currentWordDisplay.innerHTML = gameObject.displayArray.join("");

		 	//reset lives
		 	gameObject.lives = 13;
		 	remainingGuessDisplay.innerHTML = gameObject.lives;

		 	gameObject.audio.pause();
		},

		playAudio: function(){
			var src = gameObject.playList[gameObject.prevSol];
			console.log(src);
			var audio = new Audio(src);
			audio.play();
			return audio;
		}
	};

	//pick random solution
	gameObject.currentSol = Math.floor(Math.random()*djList.length);
	gameObject.solutionArray = djList[gameObject.currentSol];
	gameObject.prevSol = gameObject.currentSol;

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
				showStatus.innerHTML = "<span class=text-danger> There is no " + guess + "</span>";

				if(gameObject.lives < 1){
					//if lives go down under 1, lose game
					showStatus.innerHTML = "GAME OVER";
					currentWordDisplay.innerHTML = gameObject.solutionArray;

					gameObject.prevSol = gameObject.currentSol;
				  gameObject.reset();
					playListDisplay.innerHTML = musicList[gameObject.prevSol];

					gameObject.audio = gameObject.playAudio();
				}
			} else {
				//if guess is in solutionArray
				//push into rightArray
				remainingGuessDisplay.innerHTML = gameObject.lives;
				showStatus.innerHTML = "<span class=text-success>" + guess + " works!</span>";
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
					gameObject.wins++;
					console.log("wins: " + gameObject.wins);
					winDisplay.innerHTML = gameObject.wins;
					showStatus.innerHTML = "YOU GOT IT! " + gameObject.solutionArray;
					currentWordDisplay.innerHTML = gameObject.solutionArray;

					//************ need to restart the game
					gameObject.prevSol = gameObject.currentSol;
					gameObject.reset();
					playListDisplay.innerHTML = musicList[gameObject.prevSol];

					gameObject.audio = gameObject.playAudio();

				}
			}
		}
	};
}


window.onLoad = gameMain();
