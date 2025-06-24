//unordered list for guessed letters
const guessedLetters = document.querySelector(".guessed-letters");
//Guess button
const guess = document.querySelector(".guess");
//text input for guessing letter
const pickLetter = document.querySelector(".letter");
//paragraph to show word in progress
const progress = document.querySelector(".word-in-progress");
//paragraph to show remaining guesses
const remaining = document.querySelector(".remaining");
//span for remaining guesses
const numRemaining = document.querySelector("span");
//paragraph for messages to player
const message = document.querySelector(".message");
//play again button
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

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
    const choose = pickLetter;
    console.log(choose);
    choose.value = "";
});