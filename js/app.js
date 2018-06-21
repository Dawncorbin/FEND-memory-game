/*
 * Create a list that holds all of your cards
 */
    const card = document.getElementsByClassName('card');
    const cards = ['fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
              'fa-bolt', 'fa-bolt',
              'fa-cube', 'fa-cube',
              'fa-leaf', 'fa-leaf',
              'fa-bicycle', 'fa-bicycle',
              'fa-bomb', 'fa-bomb',
            ];

    const deck = document.querySelector('.deck');

  //loop to add event listeners to each card

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//referenced this shuffle function by https://css-tricks.com/snippets/javascript/shuffle-array
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffleDeck(o) {
      for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
};

cards.sort(function () {
      return 0.25 - Math.random()
});

/*function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
*/

//create allCards
  function generateCard() {
    for (let i =o; i < cards.length; i++) {
        let list = document.createElement("li");
        deck.appendChild(list);
        list.className = "card";

        let info = document.createElement("i");

        list.appendChild(info);
        infor.className = `fa ${cards[i]} "data-set=" ${cards}`;
    }
  }

generateCard();

//shuffle new cards
shuffleDeck(cards);

//the following was helped along courtesy of Mike Wales webinar

//compare mates
let allCards = document.querySelectorAll('.card');
let openCards = [];
let matched = [];

  allCards.forEach(function (card) {
      card.addEventListener('click', function (e) {
          if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
              openCards.push(card);
              card.classList.add('open', 'show');
                if (openCards.length == 2) {

                  //if a match
                  if (openCards[0].innerHTML === openCards[1].innerHTML) {

                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');

                    openCards = [];

                    //if no match
                  }else{
                      setTimeout(function (openCards) {
                          allCards.forEach(function (card) {
                            card.classList.remove('open', 'show');

                          });
                      }, 1000);

                      openCards = [];
                      moves += 1;
                      moveCounter.innerHTML = moves;

                  }
                  startCounter();
                }
                gameOver();

          }
      });
  });

//shuffles deck
  /*function initGame() {
      let deck = document.querySelector ('.deck');
      let cardHTML = shuffle(cards).map (function(card) {
          return generateCard(card);
      });

        deck.innerHTML = cardHTML.join('');
  }*/

/*
 * set up the event listener for a card. If a card is clicked:*/


 /*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//removes first and second stars based on move count after 12 & 16 Moves
  function starRating () {
      if (moves > 12 && moves < 16) {
        first.style.visibility = 'hidden';

      } else if (moves > 16) {
        second.style.visibility = 'hidden';
      }
  }

//move counter
  function moveCount() {
      moves++;
      moveCounter.innerHTML = moves;
        starRating();
    }

//click counter, starts timer after first 'play'
  function clickCount() {
      if (clicks === 0) {
        startTimer();
        clicks++;
      } else {
        clicks++;
      }
  }
