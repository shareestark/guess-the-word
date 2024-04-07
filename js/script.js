const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess"); 
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again hide");

let word = "magnolia";
const guessedLetters = [];

let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch (
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    ); 
    const words = await res.text(); 
    const wordArray = words.split("\n");  
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
}

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();

    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {
        message.innerText = "Please enter a letter."; }
            else if (input.length > 1) {
                message.innerText = "Please enter only one letter";
            } else if (!input.match(acceptedLetter)) {
                message.innerText = "Please enter a valid letter from A-Z";
            } else {
                return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
        updateRemainingGuesses(guess);
    }
};


const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    } 
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const updatedWord = [];

    for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
        updatedWord.push(letter.toUpperCase()); 
    } else {
        updatedWord.push("●"); 
    }
}
wordInProgress.innerText = updatedWord.join("");
checkWin();
};


const checkWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congratulations!</p>`;
    }
};


//Fetch Words & Remaining Guesses Step 5 of 5

const updateRemainingGuesses = function (guess) {
    const wordUpper = word.toUpperCase(); 
    if (!word.includes(guess)) {
    message.innerText = `The world does not include that letter. Try again!`};
    remainingGuesses -= 1; 
        if (word.includes(guess)) {
            message.innerText = `You guessed right! Keep it coming!`;
        } else if (remainingGuesses === 0) {
            message.innerText = `You have run out of chances. The correct word is ${word}.`
    }
    }

// Add an async function 




    








    