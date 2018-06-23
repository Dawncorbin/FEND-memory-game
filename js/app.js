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

    //move counter
    const moveCounter = document.querySelector('.moves');
    let moves = 0;

    let matches = document.getElementsByClassName("match");
    let modal = document.getElementById("end-modal");
    let modalText = document.getElementById("end-text");

    let running;

    //the following was helped along courtest of Chris N slack post
    //timer
    let sec = 0;
    let min = 0;
    let timer;

      deck.addEventListener('click', function startTimer() {
        timer = setInterval(insertTime, 1000);
    });

      function stopTimer() {
          clearInterval (timer);
          sec = 0;
          min = 0;

      }

      function insertTime() {
        sec++;

          if (sec < 10) {
              sec = `0${sec}`;

          }

          if (sec >= 60) {
            min++;
            sec = "00";

          }

          //display time
          document.querySelector('.timer-output').innerHTML = "0" + min + ":" + sec;
      }

      //refresh game
      const refresh = document.querySelector('.restart');
        refresh.addEventListener('click', function restart() {
            window.location.reload(false);
        });
  //loop to add event listeners to each card

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//referenced this shuffle function by https://css-tricks.com/snippets/javascript/shuffle-array
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(o) {
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

//create all Cards
  function generateCard() {
    for (let i = 0; i < cards.length; i++) {
        let list = document.createElement("li");
        deck.appendChild(list);
        list.className = "card";

        let info = document.createElement("i");

        list.appendChild(info);
        info.className = `fa ${cards[i]} "data-set=" ${cards}`;
    }
  }

generateCard();

//shuffle new cards
//shuffle(cards);
//shuffles deck
  /*function initGame() {
      let deck = document.querySelector ('.deck');
      let cardHTML = shuffle(cards).map (function(card) {
         return generateCard(card);
      });

        deck.innerHTML = cardHTML.join('');
  }
*/
//initGame();
//the following was helped along courtesy of Mike Wales webinar

//compare matches
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
                  starCounter();
                }
                  gameOver();

          }
      });
  });

  //the following is from Matthew Cranford's walkthrough - https://matthewcranford.com/memory-game-walkthrough-part-5-moves-stars/
  //star count
  let stars = document.querySelectorAll('.stars.li');

  let starCount = 3

  function starCounter() {
      for (let a= 0; a < 20; a++) {
        if (moves > 20) {

          for (star of stars) {
            stars[2].style.display = 'none';
            starCount = 0;

          }

        }else if (moves > 15) {
            for (star of stars) {
              stars[1].style.display = 'none';
              starCount = 1;

          }

        }else if (moves > 10) {
            for (star of stars) {
                stars[0].style.display = 'none';
                starCount = 2;

            }
        }
      }
  }
//if all matches are found - a modal opens and timer stops

//pop up modal
function gameOver() {
    if (matches.length === cards.length) {
      clearInterval(running);
      modal.style.display = "block";
      if (starCount >= 2) {

          modalText.innerText = `Congratulations! You finished the game in ${moves} moves in ${min} minutes and ${sec} seconds. You've earned ${starCount} stars! What would you like to do next?`;
      }else{
          modalText.innerText = `Congratulations! You finished the game in ${moves} moves in ${min} minutes and ${sec} seconds. You've earned ${starCount} star! What would you like to do next?`;
      }
    }
}


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
