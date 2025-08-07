//unordered list for guessed letters
const guessedLettersUl = document.querySelector(".guessed-letters");
//Guess button
const guess = document.querySelector(".guess");
//text input for guessing letter
const pickLetter = document.querySelector(".letter");
//paragraph to show word in progress
const progress = document.querySelector(".word-in-progress");
//paragraph to show remaining guesses
const remaining = document.querySelector(".remaining");
//span for remaining guesses
const numRemaining = document.querySelector(".remaining span");
//paragraph for messages to player
const message = document.querySelector(".message");
//play again button
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholders(word);
};

getWord();

//display placeholders
const placeholders = function (word) {
  const letterPlaceholder = [];
  for (const letter of word) {
    letterPlaceholder.push("●");
  }
  progress.innerText = letterPlaceholder.join("");
};

guess.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";

    const choose = pickLetter.value;
    
    const goodGuess = checkInput(choose); 
    if (goodGuess) {
      makeGuess(choose);
    }  
    pickLetter.value = "";
});

//check input and show error message
const checkInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Only enter one letter please.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function(choose) {
    choose = choose.toUpperCase();
    if (guessedLetters.includes(choose)) {
        message.innerText = "You already guessed that letter. Please try again.";
    } else {
        guessedLetters.push(choose);
        console.log(guessedLetters);
        updateGuessesRemaining(choose);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

//show the guessed letters
const showGuessedLetters = function () {
    guessedLettersUl.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersUl.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
          revealWord.push("●");
        }
    }

    progress.innerText = revealWord.join("");
    checkIfWin();
};

// show informative messages
const updateGuessesRemaining = function (choose) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(choose)) {
        message.innerText = `Sorry, the word has no ${choose}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${choose}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        numRemaining.innerText = `${remainingGuesses} guess`;
    } else {
        numRemaining.innerText = `${remainingGuesses} guesses`;
    }
};

// check if they won
const checkIfWin = function () {
    if (word.toUpperCase() === progress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the right word! Congrats!</p>`;
        startOver();
    } 
};

// hide finished game and display new elements to play again
const startOver = function () {
    guess.classList.add("hide");
    remaining.classList.add("hide");
    guessedLettersUl.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function() {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    numRemaining.innerText = `${remainingGuesses} guesses`;
    guessedLettersUl.innerHTML = "";
    message.innerText = "";

    getWord();

    guess.classList.remove("hide");
    playAgain.classList.add("hide");
    remaining.classList.remove("hide");
    guessedLettersUl.classList.remove("hide");
});