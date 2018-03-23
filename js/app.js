//declare the main variables and array
let roundMoves = 0;
let gameMoves = 0;
let gameEndCount = 0;
let clicksCounts = 0;
let symbols = ['images/boat.png', 'images/boat.png', 'images/building.png', 'images/building.png', 'images/daruma.png', 'images/daruma.png', 'images/doll.png', 'images/doll.png', 'images/star.png', 'images/star.png', 'images/teddy-bear.png', 'images/teddy-bear.png', 'images/toys.png', 'images/toys.png', 'images/tricycle.png', 'images/tricycle.png']
let openCell = [];
let timeExcuation;


function clickedCell(evt) {
	//Start the game time tracker
	if (gameMoves === 0 && roundMoves === 0) {
		timeCalculator();
	}

	//Track the clicks so I can use it on the stars rating system
	clicksCounts++;

	switch (clicksCounts) {
		case 17:
			$('.star-rating span:nth-child(3)').removeClass('checked');
			break;
		case 25:
			$('.star-rating span:nth-child(2)').removeClass('checked');
			break;
		case 33:
			$('.star-rating span:nth-child(1)').removeClass('checked');
			break;
	}

	if (roundMoves === 0) {
		roundMoves++;
		$(evt.target).addClass('clicked');
		$(evt.target).toggleClass('flipped');
		openCell[0] = $(evt.target).children('img').attr('src');
	} else if (roundMoves === 1) {
		//Prevent more than 2 click on the same round
		roundMoves = 2;
		$(evt.target).addClass('clicked');
		$(evt.target).toggleClass('flipped');
		openCell[1] = $(evt.target).children('img').attr('src');
		gameMoves++;
		//Update game moves
		$('.game-moves').text(gameMoves);
		window.setTimeout(roundCheck, 1000);
	}
}

function roundCheck() {
	if (openCell[0] === openCell[1]) {
		$('.clicked').addClass('identical pulse');
		gameEndCount++;
		if (gameEndCount === 8) {
			gameResult();
		}
	}
	$('.main-playground-container .playground-cell').removeClass('flipped clicked');
	//Reset the round
	roundMoves = 0;
	//Empty the aray
	openCell = [];
}

function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function distributionSymbols(array) {
	shuffle(symbols);
	for (let i = 0; i <= array.length; i++) {
		$('.playground-cell:nth-child(' + (i + 1) + ') img').attr('src', array[i]);
	}
}

function timeCalculator() {
	let sec = 0;

	function pad(val) {
		return val > 9 ? val : '0' + val;
	}
	timeExcuation = setInterval(function () {
		//To stop the game time tracker
		if (gameEndCount === 8) {
			return;
		}
		document.getElementById('seconds').innerHTML = pad(++sec % 60);
		document.getElementById('minutes').innerHTML = pad(parseInt(sec / 60, 10));
	}, 1000);
}

function gameResult() {
	$('#resultModal').css('display', 'block');
	$('.resault-moves').text('Your Moves: ' + gameMoves);
	$('.resault-time').text('Your time: ' + document.getElementById('minutes').innerHTML + " : " + document.getElementById('seconds').innerHTML);
}

// When the user clicks on (x), close the modal
document.querySelector('.close').addEventListener('click', function () {
	$('#resultModal').css('display', 'none');
});

// When the user clicks anywhere outside of the modal, close it
$(window).click(function (evt) {
	if (evt.target == $('#resultModal')[0]) {
		$('#resultModal').css('display', 'none');
	}
});

$(".restart-game").each(function () {
	let restartGame = this;
	restartGame.addEventListener("click", function (evt) {
		gameMoves = 0;
		roundMoves = 0;
		clicksCounts = 0;
		$('.game-moves').text(gameMoves);
		gameEndCount = 0;
		openCell = [];
		$('.main-playground-container .playground-cell').removeClass('flipped clicked identical pulse');
		$('.star-rating span').addClass('checked');
		clearInterval(timeExcuation);
		$('#seconds').text('00');
		$('#minutes').text('00');
		window.setTimeout(distributionSymbols, 1000, symbols);
		$('#resultModal').css('display', 'none');
	});
});

//The main Event Listener for the playground
document.querySelector('.main-playground-container').addEventListener('click', function (evt) {
	//Check if the user click on a card and disable click when there is two cards open.
	if ($(evt.target).attr('class') === 'playground-cell' && roundMoves !== 2) {
		clickedCell(evt);
	}
});

//Re arrange the array that's hold the card images
distributionSymbols(symbols);
