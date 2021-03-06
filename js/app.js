/*
 * @description: Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards = [...card];

// @param: declaring variables
let moves = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");
let openedCards = [];

let matchedCard = document.getElementsByClassName("match");
const deck = document.querySelector(".deck");

let second = 0;
let minute = 0;
let interval;
let timer = document.querySelector(".timer");
/*
 * @description: Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// @constructor: Shuffle function from http://stackoverflow.com/a/2450976
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

//@constructor: start new game
function startGame (){
    openedCards = [];
    let shuffledCards = shuffle(cards);
    for (let i= 0; i < shuffledCards.length; i++){
        [].forEach.call(shuffledCards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
	//reset rating
	for (let i= 0; i < stars.length; i++){
        stars[i].style.color = "#ffd500";
        stars[i].style.visibility = "visible";
    }
	//reset moves
	moves = 0;
    counter.innerHTML = moves;
	
    //reset timer
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


document.body.onload = startGame();

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

 //@constructor: display the card's symbol
 function displaySymbol (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
 };


//@constructor: check if two cards are a match or not
 function checkMatch(){
    openedCards.push(this);
    let len = openedCards.length;
    if(len === 2){
        moveCounter();
        if (openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }  
 };

//@constructor: adds matched cards to the que
 function matched(){
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
};

//@constructor: handles unmatched cards
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
    },1100);
}

//@constructor: disables unmatched cards for clicks
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}
//@constructor: enables unmatched cards for clicks
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

//@constructor: counts moves 
function moveCounter(){   
    moves++;    
    counter.innerHTML = moves;
    if (moves == 1){
        startTimer();
    }

    //@param: star rating based on moves
    if(moves == 14){
        stars[2].style.visibility = "collapse";
    }
    else if (moves == 20){
        stars[1].style.visibility = "collapse";
    }
   
}

//@constructor:timer
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

// congratulations modal
let modal = document.getElementById("popup1")

//@param: close icon and play again button in modal
let closeicon = document.querySelector(".close");

let playAgainButton = document.getElementById("play-again");

//@constructor: congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
    //show congratulations modal
    modal.classList.add("show");
    //@param: declare star rating variable
    let starRating = document.querySelector(".stars").innerHTML;
    // @param: showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    //closeicon on modal
    closeModal();
	//play again? button	
	playAgain();
    };
}

//@constructor: close modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}

//@constructor: play Again button
function playAgain(){
	playAgainButton.addEventListener("click", function(e){
		modal.classList.remove("show");
		startGame();
	});
}

 // add event listeners to each card
 for (let i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", displaySymbol);
    cards[i].addEventListener("click", checkMatch);
    cards[i].addEventListener("click", congratulations);
 };