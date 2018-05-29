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

// Resets game when reset button is clicked
var restart = document.querySelector('.restart')

restart.addEventListener("click", function () {
    location.reload();
});


// Displays star rating for number of moves
function generateStar() {
    //when moves = 20 --> 1 star
    //when moves = 13 --> 2 stars
    //when moves = 0 --> 3 stars
    const htmlTextToAdd = '<li><i class="fa fa-star"></i></li>';
    const oneStar = document.querySelector('li');

    if (moves == 20) {
        stars.removeChild(oneStar);
    }
    if (moves == 13) {
        stars.removeChild(oneStar);
    }
    if (moves == 1) {
        stars.insertAdjacentHTML('beforeend', htmlTextToAdd);
        stars.insertAdjacentHTML('beforeend', htmlTextToAdd);
        stars.insertAdjacentHTML('beforeend', htmlTextToAdd);
    }
}

var timer = document.querySelector('.timer');

var min = 0
var sec = 0;

var gameTimer;

function gameTimer() {
    var gameTimer = setInterval(function () {
        timer.innerHTML = min + " : " + sec;
        sec++;

        if (sec == 60) {
            min++;
            sec = 00;
        }
    }, 1000);

}

function clearGameTimer() {
    clearTimeout(gameTimer);
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

    gameTimer();

    // if (timer.innerText == "0 : 5") {
    //     console.log("Found me!");
    //     clearGameTimer();
    // }

    // FINISH THIS FUNCTION Game Won!
    // function gameWon() {
    //     document.getElementById('congratsModal');
    //     modal.style.display = "block";
    // }

    //solve bug that allows 3 cards to be open at once... do something
    //with the timer?
}

initGame();

var allCards = document.querySelectorAll('.card');
var openCards = [];
var matchedCards = [];
var moves = 0;
var moveCounter = document.querySelector('.moves');
var stars = document.querySelector('.stars');

// Evaluates if the 2 cards flipped are a match
allCards.forEach(function (card) {
    card.addEventListener('click', function (event) {

        // Disables the same card location to be open at the same time
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');

            // If the cards match, leave them open
            if (openCards.length == 2) {
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');

                    matchedCards.push(openCards[0]);
                    matchedCards.push(openCards[1]);

                    openCards = [];
                } else {
                    //if they don't match, hide the cards
                    setTimeout(function () {
                        openCards.forEach(function (card) {
                            card.classList.remove('open', 'show');
                        });
                        openCards = [];
                    }, 1000);
                }

                // When all 8 matches are found, congrats to user on finished game
                if (matchedCards.length == 2) {
                    console.log("You won!");
                    clearInterval(timer);
                    // gameWon();
                }

                // Increase move counter by 1
                moves += 1;
                moveCounter.innerText = moves;
                // Updates start rating as moves increase
                generateStar();

            }
        }
    });
});