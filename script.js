const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice-img");
const currentScore0 = document.querySelector(".current--0");
const currentScore1 = document.querySelector(".current--1");
const score0 = document.querySelector(".score--0");
const score1 = document.querySelector(".score--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const containerDice = document.querySelector(".container");

////////////////////////////////////////////////////////////////////////////
//rotate  dice
const cube = document.querySelector(".cube");
const front = document.querySelector(".front");
const getRandom = function (min = 1, max = 6) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
let sides = {
  side1: [0, 0],
  side2: [180, 0],
  side3: [270, 0],
  side4: [90, 0],
  side5: [0, 270],
  side6: [0, 90],
};
let startSide = [0, 0];

////////////////////////////////////////////////////////////////////////////
let activePlayer = 0;
let currentScoreActiv;
let scoreActiv;

const init = function () {
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  containerDice.classList.add("hidden");
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
  containerDice.classList.remove("hidden");
  let randomNumber = getRandom();
  // diceEl.setAttribute("src", `dice-${randomNumber}.png`);
  //rotate dice

  let randomSide = sides[`side${randomNumber}`];
  cube.animate(
    [
      // keyframes
      { transform: `rotateY(${startSide[0]}deg) rotateX(${startSide[1]}deg)` },

      {
        transform: `rotateY(${randomSide[0] + 360}deg) rotateX(${
          randomSide[1] + 360
        }deg)`,
      },
    ],
    {
      // timing options
      duration: 1000,
    }
  );
  cube.style.transform = `rotateY(${randomSide[0]}deg) rotateX(${randomSide[1]}deg)`;

  window.setTimeout(function () {
    showResultCurrent(randomNumber);
  }, 2000);
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
