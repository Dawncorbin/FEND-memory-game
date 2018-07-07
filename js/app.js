
const restart = document.querySelector('.restart');
let modal = document.querySelector('.modal-content');



//array holding all cards
let allCards = ['fa-diamond', 'fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor',
            'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb', 'fa-bomb'];

//moves variables
var movesCounter = document.querySelector('.moves');
var moves = 0;

//keep track of open cards
var openCards = [];

//load new game - Shuffle
newGame();

// Shuffle function from http://stackoverflow.com/a/245096
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

  //loop through each card and create its HTML
      function makeCard(card) {
          return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
      }

      function newGame() {
        var deck = document.querySelector('.deck');
        var cardGrid = shuffle(allCards).map(function (card) {
          return makeCard(card);
        });
        deck.innerHTML = cardGrid.join('');
      }

      let movesMade = 0;
      let cardsClicked = 0;

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

      //timer
      let sec = 0;
      let min = 0;
      let timer;
      var started = false;

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

      var cardList = document.querySelectorAll('.card');
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
      let matchedCards = [];

      function cardMatch() {
        openCards[0].classList.add('match', 'open', 'show');
        openCards[1].classList.add('match', 'open', 'show');
        matchedCards.push(openCards[0]);
        matchedCards.push(openCards[1]);
        congratulations();

        openCards = [];
      }

      restart.addEventListener('click', reset);

      function reset() {
        location.reload();
      }

      function notMatching() {

        setTimeout(function () {
          for (let card of openCards) {
            card.classList.remove('open', 'show');
          }

          openCards = [];
        }, 700)
        starRating();
      }


//modal
function congratulations() {
  if (matchedCards.length === 16) {
    stopTimer();

    var starRating = document.querySelector('.stars').innerHTML;
    document.getElementById('total-moves').innerHTML = movesMade;
    document.getElementById('total-stars').innerHTML = starRating;
    document.getElementById('endTime').innerHTML = document.querySelector('.timerOutput').innerHTML;
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
  }
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
}



/*


 * Create a list that holds all of your cards
 */





 /*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
