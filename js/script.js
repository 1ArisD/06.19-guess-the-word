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

const word = "magnolia";
const guessedLetters = [];

//display placeholders
const placeholders = function (word) {
  const letterPlaceholder = [];
  for (const letter of word) {
    console.log(letter);
    letterPlaceholder.push("●");
  }
  progress.innerText = letterPlaceholder.join("");
};

placeholders(word);

guess.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";

    const choose = pickLetter.value;
    console.log(choose); 
    choose.value = "";  

    const goodGuess = checkInput(choose); 
    if (goodGuess) {
      makeGuess(choose);
    }  
    pickLetter.value = "";
});

//check input
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
    }
};