const url = 'quiz.json';
let quizArr = [];
let quizObj = {};
let cur = 0;
const output = document.querySelector('.output');
const btn = document.querySelector('.btn');
const h1 = document.querySelector('h1');
const player = {score: 0};
let holder = [];

function loadQuestions() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(obj => {
            quizObj = {
                "question": obj.question,
                "options": []
            };

            obj.incorrect.forEach(falseColor => {
                let tempObj = {
                    "response": falseColor,
                    "correct": false
                }       
                quizObj.options.push(tempObj)
            });
            let trueColor = obj.correct;
            let tempObj = {
                "response": trueColor,
                "correct": true
            }
            quizObj.options.push(tempObj);
            quizArr.push(quizObj);
        });

        console.log(quizArr);
    });
}

window.addEventListener('DOMContentLoaded', (e) => {
    loadQuestions();
});

btn.addEventListener('click', (e) => {
    newQuestion();
    cur++;
    e.target.style.display = 'none';
});

function newQuestion() {
    updateScore();

    const el = quizArr[cur];
    el.options.sort(() => {return 0.5 - Math.random();})

    output.innerHTML = '';
    const que1 = document.createElement('div');
    que1.classList.add('que');
    const ans1 = document.createElement('div');

    let strOutput = el.question;
    strOutput = strOutput[0].toUpperCase() + strOutput.slice(1);
    que1.textContent = strOutput + "?";

    holder = [];
    el.options.forEach(option => {
        const div = document.createElement('div');
        div.classList.add('box');
        div.textContent = option.response;
        holder.push(div);
        div.correct = option.correct;
        div.addEventListener('click', selOption);
        ans1.append(div);
    });
    output.append(que1);
    output.append(ans1);
}

function selOption(e) {
    endTurn();
    if(e.target.correct){
        player.score++;
        updateScore();
        e.target.style.backgroundColor = 'green';
    }else{
        e.target.style.backgroundColor = 'red';
    }
    nextBtn();
}

function updateScore() {
    h1.innerHTML = `${cur+1} out of ${quizArr.length} Score : ${player.score}`;
}

function nextBtn() {
    btn.style.display = 'block';
    btn.textContent = 'Next Question';
    btn.addEventListener('click', newQuestion);
    output.append(btn);
}

function endTurn() {
    holder.forEach(el => {
        el.removeEventListener('click', selOption);
        el.style.backgroundColor = '#ddd';
    });
}

