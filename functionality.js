let currentDeck;
let currentDeckArr;
let currentDeckLength;
let currentCardIndex;

$(document).ready(function () {
    restartApplication();
});

function restartApplication(){
    currentDeck = 0;
    currentCardIndex = 0;

    let deckOptions = getDecksList();

    $("#flashcard-region").html(`     
        <div id="deck-dropdown">
            <label for="dataSelection" id="mainLabel">Select a deck</label>
            <select name="dataSelection" id="dataSelection" class="dataDrop">
                <option value="0" selected disabled hidden>Deck Options</option>
                ${deckOptions}
            </select>
        </div>
    `);
}

function getDecksList(){
    let deckOptions = '';
    for (let deck in deckList){
        deckOptions += `<option value="${deckList[deck].deckID}">${deckList[deck].deckDesc}</option>`
    }

    return deckOptions;
}

$(document).on("change", "#dataSelection", function () {
    event.preventDefault();
    getSelectedDeck();
});

function getSelectedDeck(){

    currentDeck = $("#dataSelection").val();
    currentDeckArr = [];
    currentDeckLength = 0;

    for (let card in cardList){
        if(cardList[card].deckID == currentDeck){
            currentDeckArr.push(cardList[card]);
            currentDeckLength ++;
        }
    }

    shuffleDeck();
}

function shuffleDeck(){
    currentCardIndex = 0;

    for (let i = currentDeckArr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[ currentDeckArr[i], currentDeckArr[j] ] = [ currentDeckArr[j], currentDeckArr[i] ];
	}

    showQuestion();
}

function getCard(){
    let currentCard = currentDeckArr[currentCardIndex];
    return currentCard;
}

function getQuestion(){
    let currentQuestion = getCard().cardQuestion;
    return currentQuestion;
}

function getHint(){
    let currentHint = getCard().cardHint;
    return currentHint;
}

function getAnswer(){
    let currentAnswer = getCard().cardAnswer;
    return currentAnswer;
}

function getPreviousCard(){
    currentCardIndex--;
    showQuestion();
}

function getNextCard(){
    currentCardIndex++;
    showQuestion();
}

function getButtons(cardType){
    let buttonList = '';

    switch(cardType) {
        case "Question":
            buttonList += `<button class="card-button" onclick="showHint()">Show Hint</button>`;
            buttonList += `<button class="card-button" onclick="showAnswer()">Show Answer</button>`;
            break;
        case "Hint":
            buttonList += `<button class="card-button" onclick="showQuestion()">Show Question</button>`;
            buttonList += `<button class="card-button" onclick="showAnswer()">Show Answer</button>`;
            break;
        case "Answer":
            buttonList += `<button class="card-button" onclick="showQuestion()">Show Question</button>`;
            buttonList += `<button class="card-button" onclick="showHint()">Show Hint</button>`;
            break;
        default:
            buttonList += `<button class="card-button" onclick="showHint()">Show Hint</button>`;
            buttonList += `<button class="card-button" onclick="showAnswer()">Show Answer</button>`;
            break;
    }

    if(currentCardIndex != 0){
        buttonList += `<button class="card-button" onclick="getPreviousCard()">Previous Card</button>`;
    }
    if(currentCardIndex != currentDeckLength - 1){
        buttonList += `<button class="card-button" onclick="getNextCard()">Next Card</button>`;
    }

    buttonList += `<button class="card-button" onclick="restartApplication()">New Deck</button>`;
    buttonList += `<button class="card-button" onclick="shuffleDeck()">Shuffle Deck</button>`;

    return buttonList;
}

function getCurrentCardNumberForUser(){
    let currentCardMessage = `Card ${currentCardIndex + 1} of ${currentDeckLength}`
    return currentCardMessage;
}

function showQuestion(){
    $("#flashcard-region").html(`
        <div id="deck-status-region">
            ${getCurrentCardNumberForUser()}
        </div>
        <div id="card-region">
            ${getQuestion()}
        </div>
        <div id="button-region">
            ${getButtons("Question")}
        </div>
    `);
}

function showHint(){
    $("#flashcard-region").html(`
        <div id="deck-status-region">
            ${getCurrentCardNumberForUser()}
        </div>   
        <div id="card-region">
            ${getHint()}
        </div>
        <div id="button-region">
            ${getButtons("Hint")}
        </div>
    `);
}

function showAnswer(){
    $("#flashcard-region").html(`  
        <div id="deck-status-region">
            ${getCurrentCardNumberForUser()}
        </div>  
        <div id="card-region">
            ${getAnswer()}
        </div>
        <div id="button-region">
            ${getButtons("Answer")}
        </div>
    `);
}