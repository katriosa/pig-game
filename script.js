const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");
const currentScore0 = document.querySelector(".current--0");
const currentScore1 = document.querySelector(".current--1");
const score0 = document.querySelector(".score--0");
const score1 = document.querySelector(".score--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// playerIndex = [0, 1];
// let activePlayer = `player${playerIndex[0]}`;
// console.log(activePlayer);
let activePlayer = 0;
let currentScoreActiv;
let scoreActiv;

const init = function () {
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  diceEl.classList.add("hidden");
};
init();

//switch player
const switchPlayer = function () {
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  console.log(activePlayer);
  return activePlayer;
};

//new game
btnNew.addEventListener("click", init);

// //roll dice
// const getRandom = function (min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

const showResultCurrent = function (randomNumber) {
  currentScoreActiv = document.querySelector(`.current--${activePlayer}`);
  if (randomNumber === 1) {
    currentScoreActiv.textContent = 0;
    switchPlayer();
  } else {
    currentScoreActiv.textContent =
      +currentScoreActiv.textContent + randomNumber;
  }
};

btnRoll.addEventListener("click", function () {
  diceEl.classList.remove("hidden");
  let randomNumber = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  diceEl.setAttribute("src", `dice-${randomNumber}.png`);

  showResultCurrent(randomNumber);
});

//hold
btnHold.addEventListener("click", function () {
  currentScoreActiv = document.querySelector(`.current--${activePlayer}`);
  scoreActiv = document.querySelector(`.score--${activePlayer}`);
  scoreActiv.textContent =
    +scoreActiv.textContent + +currentScoreActiv.textContent;
  currentScoreActiv.textContent = 0;
  switchPlayer();
});
