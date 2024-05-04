const options = {
  HTML: "Web page language",
  CSS: "Styles web pages",
  JavaScript: "Adds interactivity",
  URL: "Web page address",
  API: "Software communication",
  Database: "Stores data",
  Server: "Provides resources",
  Git: "Tracks code changes",
  Responsive: "Adapts to screens",
  Framework: "Pre-written code",
};

const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",
  randomHint = "";
let winCount = 0,
  lossCount = 0;

const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  stopGame();
};

startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  reset();
});

function stopGame() {
  controls.classList.remove("hide");
}

function generateWord() {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];
  hintRef.innerHTML = `<div id="wordHint">
  <span>Hint: </span>${randomHint}</div>`;
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
}

function reset() {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.innerText = "";
  randomHint = "";
  userInpSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  generateWord();

  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);

    button.addEventListener("click", () => {
      if (winCount < randomWord.length && lossCount > 0) {
        let charArray = randomWord.toUpperCase().split("");
        let inputSpace = document.getElementsByClassName("inputSpace");

        if (charArray.includes(button.innerText)) {
          charArray.forEach((char, index) => {
            if (char === button.innerText) {
              button.classList.add("correct");
              inputSpace[index].innerText = char;
              winCount += 1;
              if (winCount == charArray.length) {
                resultText.innerHTML = "You Won";
                startBtn.innerText = "Restart";
                blocker();
              }
            }
          });
        } else {
          button.classList.add("incorrect");
          lossCount -= 1;
          document.getElementById(
            "chanceCount"
          ).innerText = `Chances Left: ${lossCount}`;
          if (lossCount == 0) {
            word.innerHTML = `The word was: <span>${randomWord}</span>`;
            resultText.innerHTML = "Game Over";
            blocker();
          }
        }
        button.disabled = true;
      }
    });

    letterContainer.appendChild(button);
  }
}

window.onload = () => {
  reset();
};
