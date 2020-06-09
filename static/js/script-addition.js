// import {setGameOver} from './common'
 
    range = document.querySelector('.range')
    if (range.value == null || range.value == '') {
        range.value = 100
        range.backgroundColor = 'rgba(100,0,0,0.5)';
    }

    // 开始编写 JavaScript 代码
    let randomNumberOne = Math.floor(Math.random() * range.value) + 1;
    let randomNumberTwo = Math.floor(Math.random() * range.value) + 1;
    let sum = randomNumberOne + randomNumberTwo
    
    // counters to for report purpose
    let wrongCounter = 0;
    let correctCounter = 0;

    console.log(randomNumberOne + " + " + randomNumberTwo + " = " + sum);

    const guesses = document.querySelector('.guesses');
    const lastResult = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');

    const guessSubmit = document.querySelector('.guessSubmit');
    const guessField = document.querySelector('.guessField');

    const addOnes = document.querySelector('.addOne');
    const addTwos = document.querySelector('.addTwo');

    let guessCount = 1;
    let resetButton;
    let para;

    // guessField.focus();
    addOnes.value = randomNumberOne;
    addOnes.disabled = true;
    addTwos.value = randomNumberTwo;
    addTwos.disabled = true;

    function checkGuess() {
        // alert('我是一个占位符');
        let userGuess = Number(guessField.value);
        if (guessCount === 1) {
            guesses.textContent = '上次猜的数：';
        }
        guesses.textContent += userGuess + ' ';
        
        if (userGuess === sum) {
            lastResult.textContent = '恭喜你！答对了';
            lastResult.style.backgroundColor = 'green';
            lowOrHi.textContent = '';
            if (guessCount == 1) {
                correctCounter++;
            }
            setGameOver();
        } else if (guessCount === 10) {
            lastResult.textContent = '!!!GAME OVER!!!';
            setGameOver();
        } else {
            lastResult.textContent = '你猜错了！';
            lastResult.style.backgroundColor = 'red';
            if(userGuess < sum) {
                lowOrHi.textContent = '你猜低了！';
            } else if(userGuess > sum) {
                lowOrHi.textContent = '你猜高了';
            }
        }
        
        guessCount++;
        if (guessCount == 3) {
            console.log("guessCount=3: Increase wrongCounter")
            wrongCounter++;
        }
        guessField.value = '';
        guessField.focus();
    }

    guessSubmit.addEventListener('click', checkGuess);

    function setGameOver() {
        guessField.disabled = true;
        guessSubmit.disabled = true;

        para = document.createElement('p');
        document.body.appendChild(para);
        let total = correctCounter + wrongCounter;
        para.textContent = "Total run: " + total + ", correct num: " + correctCounter + ", wrong num: " + wrongCounter;

        resetButton = document.createElement('button');
        resetButton.textContent = 'New Game';
        document.body.appendChild(resetButton);
        resetButton.addEventListener('click', resetGame);
    }

    function resetGame() {
        guessCount = 1;

        const resetParas = document.querySelectorAll('.resultParas p');
        for (let i = 0 ; i < resetParas.length; i++) {
            resetParas[i].textContent = '';
        }

        resetButton.parentNode.removeChild(resetButton);
        para.parentNode.removeChild(para)

        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = '';
        guessField.focus();

        lastResult.style.backgroundColor = 'white';

        range = document.querySelector('.range')
        console.log("range is: " + range.value)
        if (range.value == null || range.value == '') {
            range.value = 100
        }

        randomNumberOne = Math.floor(Math.random() * range.value) + 1;
        randomNumberTwo = Math.floor(Math.random() * range.value) + 1;
        sum = randomNumberOne + randomNumberTwo;
        addOnes.value = randomNumberOne;
        addTwos.value = randomNumberTwo;
        console.log(randomNumberOne + " + " + randomNumberTwo + " = " + sum);
    }