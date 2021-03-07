"use strict";

// Selecting Elements
const scoreP1 = document.getElementById("score-1");
const scoreP2 = document.getElementById("score-2");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".new-game");
const btnRoll = document.querySelector(".roll-dice");
const btnHold = document.querySelector(".hold-play");
let currentScoreP1 = document.getElementById("current-score-1");
let currentScoreP2 = document.getElementById("current-score-2");
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");

// Starting Conditions
scoreP1.textContent = 0;
scoreP2.textContent = 0;
diceEl.classList.add("hidden");

let scores = [0, 0]; //Array containing each player's score(not current score)
let activePlayer = 1;
let currentScore = 0;

const switchPlayer = function () {
  activePlayer = activePlayer === 1 ? 2 : 1;

  // changing the active player class
  player1.classList.toggle("player-active");
  player2.classList.toggle("player-active");
};

const updateAndViewScore = function () {
  scores[activePlayer - 1] += currentScore;
  document.getElementById(`score-${activePlayer}`).textContent =
    scores[activePlayer - 1];
};

const initializeAndSetCurrentScore = function () {
  currentScore = 0;
  document.getElementById(
    `current-score-${activePlayer}`
  ).textContent = currentScore;
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  // 1. Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display the dice image and the score.
  // 2.1 Note that you can manipulate the "src" attribute of an element
  diceEl.classList.remove("hidden");
  diceEl.src = `die_face_${dice}.png`;

  // 3. Check if the dice roll score is equal: if true, switch player

  if (dice != 1) {
    // Adding the dice value to the currentScore variable
    currentScore += dice;

    // Updating the current score value.
    document.getElementById(
      `current-score-${activePlayer}`
    ).textContent = currentScore;
  } else {
    //  Annul(Discard) the current score and display the general score
    document.getElementById(`current-score-${activePlayer}`).textContent = 0;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer - 1];

    //   Switching the player
    switchPlayer();

    // Initializing the currentScore variable to 0 and setting the newly active player's current score to the currentScore variable
    initializeAndSetCurrentScore();

    // Setting and Updating the general score(stored in the scores array) to the current score and setting the active players score to the updated score
    updateAndViewScore();
  }
});

btnHold.addEventListener("click", function () {
  // 1. Add current score to total score and storing it in the scores array then displaying it.
  updateAndViewScore();

  // 2. Check if scores >= 100, if true player wins:Game finishes, if false switch player
  if (scores[activePlayer - 1] >= 20) {
    //Update the score number
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer - 1];

    // Display the winner's current score
    document.getElementById(
      `current-score-${activePlayer}`
    ).textContent = currentScore;

    //Add the player-winner class to the active player that won, change the name to "wins" and remove the active player class
    document
      .querySelector(`.player-${activePlayer}`)
      .classList.add("player-winner");

    document.getElementById(
      `name-${activePlayer}`
    ).textContent = `Player ${activePlayer} Wins 🏆`;

    document
      .querySelector(`.player-${activePlayer}`)
      .classList.remove("player-active");

    //Remove the roll and hold buttons
    btnRoll.classList.add("hidden");
    btnHold.classList.add("hidden");
  } else {
    // 3.  Switching the player
    switchPlayer();

    // Initializing the currentScore variable to 0 and setting the newly active player's current score to the currentScore variable
    initializeAndSetCurrentScore();
  }
});

btnNew.addEventListener("click", function () {
  // 1. Remove the player-winner class,
  if (
    player1.classList.contains("player-winner") ||
    player2.classList.contains("player-winner")
  ) {
    player1.classList.remove("player-winner");
    player2.classList.remove("player-winner");
  }

  // 2. Remove the "wins" in the player-name class
  document.getElementById(`name-1`).textContent = `Player 1`;
  document.getElementById(`name-2`).textContent = `Player 2`;

  // 3. Add the player-active class to player 1 and initialize the acive player to player 1
  player1.classList.add("player-active");
  activePlayer = 1;

  // 4. Initialize the general scores array to back to [0, 0] and display the initialized scores
  scores = [0, 0];
  const [S1, S2] = scores;
  scoreP1.textContent = S1;
  scoreP2.textContent = S2;

  // 5. initialize the values of the current scores to 0
  currentScoreP1.textContent = 0;
  currentScoreP2.textContent = 0;

  // 6. initialize currentScore var to 0 and set it to the active player's current score
  initializeAndSetCurrentScore();

  // 7. Return the roll and the hold buttons
  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");

  //8. Remove the dice
  diceEl.classList.add("hidden");
});
