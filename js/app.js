let roundMoves = 0;
let gameMove = 0;

function clickedMe(evt) {
  roundMoves ++;
  gameMove ++;
  console.log(gameMove);
  if(roundMoves > 2) {
    roundMoves = 0;
    $(".main-playground-container .playground-cell").removeClass("clicked");
    $(".main-playground-container .playground-cell").removeClass("flipped");
  }

  $(evt.target).parent('.playground-cell').addClass('clicked');
}

function flip(evt) {
  $(evt.target).parent('.playground-cell').toggleClass('flipped');
}


document.querySelector('.main-playground-container').addEventListener('click', function (evt) {

     if($(evt.target).attr('class') === 'playground-cell-front') {
      clickedMe(evt);
      flip(evt);
    }

});
