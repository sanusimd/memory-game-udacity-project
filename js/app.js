
// Array That Hold All Card Icons
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube",
    "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

//select the parent div class deck
let cardParent = document.querySelector(".deck");

// declaring move variable
let addMoves = document.querySelector('.moves');


// declare modal 
let modal = document.querySelector('#popup1');

// Close icon in Pop up Modal 
let closeIcon = document.querySelector(".close");

// Declare variable for Restart button 
let restartBtn = document.querySelector('.restart');

// Array For Open Card 
let openedCards = [];

// Array For Matched Card 
let matchedCard = [];

/*
 *    @description Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // @description shuffles cards
// @param {array}
// @returns shuffledarray
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

// @description First Click on card
isFisrtClick = true;

// @description Start The Game for First Time  
function startGame() {
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`
        cardParent.appendChild(card);

        // Call Event Click Function
        click(card)
    }

    //Shuffle Cards
    shuffle(icons)

}

//
/*
 *     @description set up the event listener for a card. If a card is clicked
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function click(card) {
    card.addEventListener('click', function () {
        // Start Timer on first click
        // checking the condition 
        if (isFisrtClick) {
            // start timer 
            startTimer();

            //change the condition
            isFisrtClick = false;
        }

        // current and previous card variable
        const currentCard = this;
        const previousCard = openedCards[0];

        if (openedCards.length === 1) {

            card.classList.add('open', 'show', 'disable');
            openedCards.push(this);

            // compare the  two open card
            compare(currentCard, previousCard);

        } else {
            card.classList.add('open', 'show', 'disable');
            openedCards.push(this);
        }
    });
}

// @description Compare the two open card 
function compare(currentCard, previousCard) {
    if (currentCard.innerHTML === previousCard.innerHTML) {

        //matched
        currentCard.classList.add('match');
        previousCard.classList.add('match');

        matchedCard.push(currentCard, previousCard);

        openedCards = [];

        //checkinh=g if the Game is Over 
        isOver();

    } else {
        // Delay for 500, and then close not match
        setTimeout(function () {
            currentCard.classList.remove('open', 'show', 'disable');
            previousCard.classList.remove('open', 'show', 'disable');

            openedCards = [];

        }, 500);

    };

    //add moves
    moveCounter();
};

// @description Add a move 
addMoves.innerHTML = 0;
let moves = 0;
function moveCounter() {
    moves++;
    addMoves.innerHTML = moves;

    // Add Rating 
    rating();

};


// @description Add Rating
const starContainer = document.querySelector('.stars');
const star = `<li><i class="fa fa-star"></i></li>`;

starContainer.innerHTML = star + star + star;

function rating() {

    if (moves > 8 && moves < 12) {
        starContainer.innerHTML = star + star
    } else if (moves > 13) {
        starContainer.innerHTML = star
    };
};

// @description Check if the Game is Over 
function isOver() {
    if (matchedCard.length === icons.length) {
        //Stop Our Timer 
        stopTimer();

        // Congratulation function call  
        Congratulation();
    }

}

// @description Game Timer 
let second = 0, minute = 0;
let timer = document.querySelector(".timer");
let interval;
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }

    }, 1000);
};

//reset timer
function stopTimer() {
    //reset timer
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);

};

// @description restart botton
restartBtn.addEventListener('click', function () {
    // reset all the cards and varible 
    resetCards();
})

/* @description Reset array and variable and Stop Timer 
 *  -  Reset Matched Card Array 
 *  - reset Move
 * 
 */
function reset() {
    // Reset matched card array 
    matchedCard = [];

    //Reset Moves
    moves = 0;
    addMoves.innerHTML = moves;

    //Stop timer 
    stopTimer();

};

// @description  display Congratulation  when all the cards matched
function Congratulation() {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    // display  congratulation modal 
    modal.classList.add('show');

    //showing move, rating, time on modal
    document.getElementById('finalMove').innerHTML = moves;
    document.getElementById('totalTime').innerHTML = minute + "mins" + second + "secs";
    document.getElementById('starRating').innerHTML = starContainer.innerHTML;

    // closeIcon Modal
    closeModal();

}


//@description Close icons on modal popup
function closeModal() {
    closeIcon.addEventListener("click", function (e) {
        modal.classList.remove("show");
    });
};

// @desciption for user to play Again 
function playAgain() {
    modal.classList.remove("show");
    // Reset Card ;
    resetCards();
};

// @desciption delete all card, restart game and  reset card
function resetCards() {
    // delete all the cards
    cardParent.innerHTML = '';

    // Start the game to create card ... Call Function
    startGame();

    // Reset all the Variable 
    reset();
};


//Starting the game for first Time 
startGame();


