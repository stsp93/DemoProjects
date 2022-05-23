'use strict';
//Getting the Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById(`current--0`)
const current1El = document.getElementById(`current--1`)

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
let activePlayer , current, totalScore, isGameRunning;
//Starting Condition

const startGame = function () {
    diceEl.classList.add('hidden');
    activePlayer = 0;
    current = 0;
    totalScore = [0, 0];
    isGameRunning = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
startGame();
//Change Player Function
const changePlayer = function () {
    current = 0;
    document.getElementById(`current--${activePlayer}`).textContent = current;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
//Rolling the Dice
btnRoll.addEventListener('click', function () {
    if (isGameRunning) {
        //Generate Random Dice Roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
        //Display Dice
        diceEl.src = `dice-${dice}.png`;
        diceEl.classList.remove('hidden');
        //Check for 1 rolling
        if (dice !== 1) {
            current += dice;
            document.getElementById(`current--${activePlayer}`)
                .textContent = current;
        } else {
            changePlayer();
        }
    }
})
//Hold Button Functionality
btnHold.addEventListener('click', function () {
    if (isGameRunning) {
        // 1.Add current to total score
        totalScore[activePlayer] += current;
        score0El.textContent = totalScore[0];
        score1El.textContent = totalScore[1];
        // 2.Check if >= 100 else change player
        if (totalScore[activePlayer] >= 20) {
            //End Game           
            diceEl.classList.add('hidden');
            document.querySelector('.player--active').classList.add('player--winner');
            isGameRunning = false;
        } else {
            changePlayer();
        }
    }
})
//New Game Button
btnNewGame.addEventListener('click', startGame);



