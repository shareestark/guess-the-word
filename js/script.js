const guessedLetter = document.querySelector(".guessed-letter");
const button = document.querySelector(".guess"); 
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainHidden = document.querySelector(".play-again hide");
const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
}

placeholder(word);

button.addEventListener("click", function (e) {
    e.preventDefault();

    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
} );

const validateInput = function(inputValue) {
    const acceptedLetter = "/[a-zA-Z]/";

    if (inputValue.length === 0) {
        message.innerText = "Please enter a letter."; }
            else if (inputValue.length > 1) {
                message.innerText = "Please enter only one letter";
            } else if (!inputValue.match(acceptedLetter)) {
                message.innerText = "Please enter a valid letter from A-Z";
            } else {
                return inputValue;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
}








    