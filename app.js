const inputForm = document.querySelector('#input-form');
const userGuessList = document.querySelector('.user-guess');
const corPosList = document.querySelector('.cor-pos');
const corNumList = document.querySelector('.cor-num');
const textBox = document.getElementById('numBox');




// Generate Number
const ranNum = [];
let guessCount = 0;
let corNumCount = 0;
let corPosCount = 0;

function startGame() {
    let startAgain;

    textBox.disabled = false;

    if (ranNum.length < 4) {
        genNum();
    } else {
        startAgain = confirm('start new?');
        if(startAgain == true) {
            window.location.reload();
        };
    };
}

function genNum() {
    while(ranNum.length < 4) {
        let tempNum;
        tempNum = Math.floor(Math.random()*9)+1;
        if (!ranNum.includes(tempNum)) {
            ranNum.push(tempNum);
        };
    };
}


// Guess Functions

const addGuess = guess => {
    const guessArr = guess.split('').map(Number);
    const newGuess = document.createElement('li');
    const cPosCount = document.createElement('li');
    const cNumCount = document.createElement('li');

    newGuess.append(guess);
    userGuessList.append(newGuess);
    
    if(ranNum.join('') === guessArr.join('')){
        let startAgain;
        startAgain = confirm('You Win!! Start new game?');
        if(startAgain == true) {
            window.location.reload();
        };
    } else {
        for( let num of guessArr) {
            if(ranNum.includes(num)) {
                corNumCount++;
            };
        };

        for (let i = 0; i != guessArr.length; i++) {
            if(ranNum[i] == guessArr[i]) {
                corPosCount++;
            }
        };

        cNumCount.innerText = corNumCount;
        corNumCount = 0;
        corNumList.append(cNumCount);

        cPosCount.innerText = corPosCount;
        corPosCount = 0;
        corPosList.append(cPosCount);
    }; 
}

// Form Controller
inputForm.addEventListener('submit', function(e){
    e.preventDefault();
    const userGuess = inputForm.elements.guessNum;
    if (userGuess.value.length == ranNum.length) {
        addGuess(userGuess.value);
        inputForm.reset();
    } else {
        alert('Provided Number is Less/More than required digits!')
        inputForm.reset();
    };
})