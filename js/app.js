let roundMoves = 0;
let gameMoves = 0;
let gameEndCount = 0;
const symbols = ['images/boat.png','images/boat.png','images/building.png','images/building.png','images/daruma.png','images/daruma.png','images/doll.png','images/doll.png','images/star.png','images/star.png','images/teddy-bear.png','images/teddy-bear.png','images/toys.png','images/toys.png','images/tricycle.png','images/tricycle.png']
let openCell = [];

function clickedCell(evt) {
  if(gameMoves === 0 && roundMoves === 0) {
    timeCalculator();
  }

  if(roundMoves === 0) {
    roundMoves ++;
    $(evt.target).parent('.playground-cell').addClass('clicked');
    $(evt.target).parent('.playground-cell').toggleClass('flipped');
    openCell[0] = $(evt.target).siblings().children('img').attr('src');
  }
  else if(roundMoves === 1) {
    //Prevent more than 2 click on the same round
    roundMoves = 2;
    $(evt.target).parent('.playground-cell').addClass('clicked');
    $(evt.target).parent('.playground-cell').toggleClass('flipped');
    openCell[1] = $(evt.target).siblings().children('img').attr('src');
    window.setTimeout(roundCheck, 1500);
  }
}

function roundCheck() {
  if(openCell[0] === openCell[1]) {
    $( ".clicked" ).addClass('identical');
    gameEndCount ++;
    if (gameEndCount === 8) {
      gameEnd();
    }
  }
  $(".main-playground-container .playground-cell").removeClass("flipped");
  $(".main-playground-container .playground-cell").removeClass("clicked");
  //Reset the round
  roundMoves = 0;
  //Empty the aray
  openCell = [];
  gameMoves ++;
  //Update game moves
  $(".game-moves").text(gameMoves);
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

function timeCalculator() {
  let sec = 0;
  function pad ( val ) { return val > 9 ? val : "0" + val; }
  setInterval( function(){
      if (gameEndCount === 8) {
        return;
      }
      document.getElementById("seconds").innerHTML=pad(++sec%60);
      document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
  }, 1000);

}

function gameEnd(){
  gameResult();
}

function gameResult() {
  alert('Congratus your Win!!' );
  alert(gameMoves);
}

document.querySelector('.restart-game').addEventListener('click', function (evt) {

});


document.querySelector('.main-playground-container').addEventListener('click', function (evt) {
     if($(evt.target).attr('class') === 'playground-cell-front' && roundMoves !== 2) {
       clickedCell(evt);
    }
});


console.log(distributionSymbols(symbols));
