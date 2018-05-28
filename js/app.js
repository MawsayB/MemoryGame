// An array of all the card types
var cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
]

// Generates card HTML
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

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

 // Resets game when reset button is clicked
var restart = document.querySelector('.restart')

restart.addEventListener("click", function () {
    location.reload();
});

function generateStar() {
    return `<li><i class="fa fa-star"></i></li>`;
}

// Starts new game
function initGame() {
    var deck = document.querySelector('.deck');
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
var stars = document.querySelector('.stars');

// function description here
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
            if(moves <= 12){
                //3 stars for 12 or less moves
                console.log("Found me!")
                const htmlTextToAdd = '<li><i class="fa fa-star"></i></li>';
                stars.insertAdjacentHTML('beforeend', htmlTextToAdd);


            } else {
                console.log("Broken");
        }
    });
});