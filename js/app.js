//array holding all cards
let allCards = ['fa-diamond', 'fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor',
            'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb', 'fa-bomb'];

//restart variable
const restart = document.querySelector('.restart');

//moves counter
let movesCounter = document.querySelector('.moves');
let moves = 0;

//keep track of open cards
let openCards = [];

//load new game - Shuffle
newGame();

// Shuffle function from http://stackoverflow.com/a/2450976
      function shuffle(array) {
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

  //the following was referenced from Mike Wales Youtube walkthrough - https://www.youtube.com/watch?v=_rUH-sEs68Y
  //loop through each card and create its HTML
  //add HTML to generate cards

      function generateCard(card) {
          return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
      }

      function newGame() {
          let deck = document.querySelector('.deck');
          let cardGrid = shuffle(allCards).map(function (card) {
            return generateCard(card);
          });
          deck.innerHTML = cardGrid.join('');
        }

      let movesMade = 0;
      let cardsClicked = 0;



      //timer referenced from fellow FEND student Chris N
      //timer
      let sec = 0;
      let min = 0;
      let timer;
      let started = false;

      function startTimer() {
          if (!started) {
            timer = setInterval(insertTime, 1000);
            started = true;
          }
        }

      function stopTimer() {
          clearInterval(timer);
          sec = 0;
          min = 0;
          started = false;
        }
        function insertTime() {
          sec++;

            if (sec < 10) {
                sec =`0${sec}`;
            }

            if (sec >= 60) {
                min++;
                sec = "00";
            }

            //display time
            document.querySelector('.timerOutput').innerHTML = "0" + min + ":" + sec;
      }

      //set up event listener for cards
      //compare matches

      let cardList = document.querySelectorAll('.card');
      for (let card of cardList) {
          card.addEventListener('click', function () {
              startTimer()
              cardsClicked++;
              if (cardsClicked == 2) {
                movesMade++;
                cardsClicked = 0;
              }
              document.querySelector('span.moves').innerHTML = movesMade;

              if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                openCards.push(card);

                if (openCards.length > 2) {

                } else {
                  card.classList.add('open', 'show');

                  if (openCards.length === 2) {
                    if (openCards[0].dataset.card == openCards[1].dataset.card) {
                      cardMatch();
                    } else {
                      notMatching();
                    }
                  }
                }
              }
          });
      }

      //if a match
      let matchedCards = [];

      function cardMatch() {
        openCards[0].classList.add('match', 'open', 'show');
        openCards[1].classList.add('match', 'open', 'show');
        matchedCards.push(openCards[0]);
        matchedCards.push(openCards[1]);
        gameWon();

        openCards = [];
      }

      //if not a match
      function notMatching() {

        setTimeout(function () {
          for (let card of openCards) {
            card.classList.remove('open', 'show');
          }

          openCards = [];
        }, 700)
        starRating();
      }

      //restart game
      restart.addEventListener('click', reset);

      function reset() {
        location.reload();
      }

      //star rating
      function starRating() {
        const stars = document.querySelectorAll('.fa-star');
        const starsArray = Array.apply(null, stars);
        if (movesMade === 0) {
            starsArray.forEach(x => x.className = 'fa fa-star');
        }
        if(movesMade > 10 && movesMade <= 12) {
            starsArray[2].className = 'fa fa-star hide';
        }
        if (movesMade > 28) {
            starsArray[2].className = 'fa fa-star hide';
            starsArray[1].className = 'fa fa-star hide';
        }
      }

//once all matches are found - the timer stops and a modal opens
//pop up modal
let modal = document.querySelector('.modal-content');

function gameWon() {
  if (matchedCards.length === 16) {
    stopTimer();

    let starRating = document.querySelector('.stars').innerHTML;
    document.getElementById('total-moves').innerHTML = movesMade;
    document.getElementById('total-stars').innerHTML = starRating;
    document.getElementById('endTime').innerHTML = document.querySelector('.timerOutput').innerHTML;
    let modal = document.getElementById('myModal');
    modal.style.display = "block";
  }
}

let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
}
/* ***in addition to noted assistance above, I also referenced live webinar walkthroughs with Mike Wales & Ryan Waite, memory game blog posts from Matthew Cranford
(https://matthewcranford.com/memory-game-walkthrough-part-1-setup/), FEND project 2 slack channel, https://developer.mozilla.org/en-US/, https://www.w3schools.com/,
and https://stackoverflow.com/ *** */


 /*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
