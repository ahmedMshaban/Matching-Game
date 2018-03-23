# Matching-Game

## Table of Contents

* [How The Game Works](#HowGameWorks)
* [Game Functionality](#Functionality)

## How The Game Works

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

  -The player flips one card over to reveal its underlying symbol.
  -The player then turns over a second card, trying to find the corresponding card with the same symbol.
  -If the cards match, both cards stay flipped over.
  -If the cards do not match, both cards are flipped face down.
The game ends once all cards have been correctly matched.

## Game Functionality

### Correct Guess
If the cards match, both cards stay flipped over and the background color will change.

### Incorrect Guess
If the cards do not match, both cards are flipped face down.

### Moves
Each two guesses(correct or incorrect) the number of moves will increase by one.

### Time
When the player start to click on the card and make first guess the time tracker will start.

### Stars
-When the game start the player will have 3 stars with (orange color) after 17 guesses (17 clicks on the cards) the stars will decrease by 1 so the user will have 2 stars with orange color only.
-After after another 8 guesses (25 guess on the total) the stars will decrease by 1 so the user will have 1 star with orange color only.
-After after another 8 guesses (33 guess on the total) the stars will decrease by 1 so the user will have 0 star.

### Restart
When the player click on the restart button the game will start over and will change the cards places.
