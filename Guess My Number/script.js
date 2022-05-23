'use strict';
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 4;
let highScore = 0;
let isGameRunning = true;
const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', function () {
    const input = Number(document.querySelector('.guess').value);
    if ((input < 1 || input > 20) && isGameRunning) {
        displayMessage('🚫Type Number Between 1 and 20');
    } else if (isGameRunning) {
        score--;
        document.querySelector('.score').textContent = score;
        if (score > 0) {
            if (input === secretNumber) {
                displayMessage('🏆You Guessed it Right');
                if (score > highScore) {
                    highScore = score;
                    document.querySelector('.highscore').textContent = highScore;
                }
                document.querySelector('.number').textContent = secretNumber;
                document.querySelector('body').style.backgroundColor = '#60b347';
                document.querySelector('.number').style.width = "30rem";
                isGameRunning = false;
            } else {
                input < secretNumber ? displayMessage('📈Your Number is Lower') : displayMessage('📉Your Number is Higher')
            }
        } else {
            displayMessage('💣Game Lost');
            document.querySelector('.number').style.width = "10rem";
            document.querySelector('.number').textContent = '☠';
            isGameRunning = false;
        }
    }

})
document.querySelector('.again').addEventListener('click', function () {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 4;
    isGameRunning = true;
    displayMessage('Guess again');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = "15rem";
    document.querySelector('.guess').value = '';
})

