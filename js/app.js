let roundMoves = 0;
let gameMoves = 0;
let gameEnd = 0;
const symbols = ['images/boat.png','images/boat.png','images/building.png','images/building.png','images/daruma.png','images/daruma.png','images/doll.png','images/doll.png','images/star.png','images/star.png','images/teddy-bear.png','images/teddy-bear.png','images/toys.png','images/toys.png','images/tricycle.png','images/tricycle.png']
let openCell = [];

function clickedCell(evt) {
  if(roundMoves === 0) {
    roundMoves ++;
    $(evt.target).parent('.playground-cell').addClass('clicked');
    $(evt.target).parent('.playground-cell').toggleClass('flipped');
    openCell[0] = $(evt.target).siblings().children('img').attr('src');
    console.log(openCell);
  }
  else if(roundMoves === 1) {
    //Prevent more than 2 click on the same round
    roundMoves = 2;
    $(evt.target).parent('.playground-cell').addClass('clicked');
    $(evt.target).parent('.playground-cell').toggleClass('flipped');
    openCell[1] = $(evt.target).siblings().children('img').attr('src');
    console.log(openCell);
    window.setTimeout(roundCheck, 1500);
  }
}

function roundCheck() {
  if(openCell[0] === openCell[1]) {
    $( ".clicked" ).addClass('identical');
    gameEnd ++;
    if (gameEnd === 8) {
      gameResult();
    }
  }
  $(".main-playground-container .playground-cell").removeClass("flipped");
  $(".main-playground-container .playground-cell").removeClass("clicked");
  //Reset the round
  roundMoves = 0;
  //Empty the aray
  openCell = [];
  gameMoves ++;

}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
  for (let i = 0; i <= array.length; i++){
    $('.playground-cell:nth-child('+ (i+1)+') img').attr('src',array[i]);
  }
}

function gameResult() {
  alert('Congratus your Win!!' );
  alert(gameMoves);
}


document.querySelector('.main-playground-container').addEventListener('click', function (evt) {
     if($(evt.target).attr('class') === 'playground-cell-front' && roundMoves !== 2) {
      clickedCell(evt);
    }
});


console.log(distributionSymbols(symbols));


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
