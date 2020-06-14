    // 开始编写 JavaScript 代码
    // range = document.querySelector('.range')
    // console.log("range is: " + range.value)
    // if (range.value == null || range.value == '') {
    //     range.value = 100
    // }

    let r = document.querySelector('.range')
    if (r.value == null || r.value == '') {
        r.value = 100
    }
  
    let randomNumberOne = Math.floor(Math.random() * r.value) + 1;
    let randomNumberTwo = Math.floor(Math.random() * r.value) + 1;
    while ((randomNumberTwo > randomNumberOne) || (randomNumberTwo % 10 > randomNumberOne % 10)) {
      randomNumberOne = Math.floor(Math.random() * r.value) + 1;
      randomNumberTwo = Math.floor(Math.random() * r.value) + 1;
    }

    let sum = randomNumberOne - randomNumberTwo

    console.log(randomNumberOne + " - " + randomNumberTwo + " = " + sum);

    const guesses = document.querySelector('.guesses');
    const lastResult = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');

    const guessSubmit = document.querySelector('.guessSubmit');
    const guessField = document.querySelector('.guessField');

    const addOnes = document.querySelector('.addOne');
    const addTwos = document.querySelector('.addTwo');

    // counters to for report purpose
    let wrongCounter = 0;
    let correctCounter = 0;

    let guessCount = 1;
    let resetButton;

    let range = 100;

    addOnes.value = randomNumberOne;
    addOnes.disabled = true;
    addTwos.value = randomNumberTwo;
    addTwos.disabled = true;

    function checkGuess() {
        total = document.querySelector('.total');
        total.disabled = true;
        correct = document.querySelector('.correct');
        correct.disabled = true;
        wrong = document.querySelector('.wrong');
        wrong.disabled = true;

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
                correct.value = correctCounter;
                total.value = correctCounter + wrongCounter;
                wrong.value = wrongCounter;
            } else if (guessCount > 1) {
                correct.value = correctCounter;
                total.value = correctCounter + wrongCounter;
                wrong.value = wrongCounter;              
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
        
        if (guessCount == 2) {
            console.log("guessCount=2: Increase wrongCounter")
            wrongCounter++;
            console.log("wrongCount=" + wrongCounter)
        }
        guessCount++;

        guessField.value = '';
        guessField.focus();
    }

    guessSubmit.addEventListener('click', checkGuess);

    function setGameOver() {
        guessField.disabled = true;
        guessSubmit.disabled = true;

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
        while ((randomNumberTwo > randomNumberOne) || (randomNumberTwo % 10 > randomNumberOne % 10)) {
          randomNumberOne = Math.floor(Math.random() * range.value) + 1;
          randomNumberTwo = Math.floor(Math.random() * range.value) + 1;
        }
        sum = randomNumberOne - randomNumberTwo;
        addOnes.value = randomNumberOne;
        addTwos.value = randomNumberTwo;
        console.log(randomNumberOne + " - " + randomNumberTwo + " = " + sum);
    }