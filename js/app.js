/*
 * Creates an array that holds all cards
 */

var cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
]

function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle (BELOW?) the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

//when card is clicked
//the card changes to the contents

//when container is clicked... 
//locate which unique ID has been selected

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

 //timer notes:
 //setTimeout - once
 //use setInterval - over and over and over
 //put in initGame function
 //that adds 1 to the timer
 //update text with timer
 //clearInterval resets the timer

 //var timer = setTimeout();
 //pass setTimeout to clearTimeout to kill the timer

 //solve bug that allows 3 cards to be open at once... do something
 //with the timer?

 //resets game when reset button is clicked
var restart = document.querySelector('.restart')

restart.addEventListener("click", function () {
    location.reload();
});

function initGame() {
    var deck = document.querySelector('.deck');
    //keep the line below?
    var moveCounter = document.querySelector('.moves');

    var cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });
    moves = 0;
    moveCounter.innerText = moves;

    deck.innerHTML = cardHTML.join('');
}

initGame();

var allCards = document.querySelectorAll('.card');
var openCards = [];
var moves = 0;
var moveCounter = document.querySelector('.moves');


allCards.forEach(function (card) {
    card.addEventListener('click', function (event) {
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');

            if (openCards.length == 2) {
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');

                    openCards = [];
                } else {
                    //if they don't match, hide
                    setTimeout(function () {
                        openCards.forEach(function (card) {
                            card.classList.remove('open', 'show');
                        });
                        openCards = [];
                    }, 1000);
                }

                moves += 1;
                moveCounter.innerText = moves;
            }
        }
    });
});