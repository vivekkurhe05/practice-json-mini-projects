const url = 'quiz.json';
const quizArr = [];
let quizObj = {};
let cur = 0;
const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
const h1 = document.querySelector('h1');
let holder = [];
let player = {score:0};

window.addEventListener('DOMContentLoaded', (e) => {

    fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(el => {
            quizObj = {
                "question": el.question,
                "options": []
            }

            el.incorrect.forEach(falseColor => {
                let tempObj = {
                    "response": falseColor,
                    "correct": false
                }

                quizObj.options.push(tempObj);
            });
            let tempObj = {
                "response": el.correct,
                "correct": true
            }
            let randInt = Math.ceil(Math.random() * quizObj.options.length);
            quizObj.options.push(tempObj);
            quizArr.push(quizObj);
        });
    });
});

btn.addEventListener('click', (e) => {

    e.target.style.display = 'none';
    if(quizArr[cur] === undefined) {
        console.log(player)
        output.innerHTML = `<hr><h1>Score = ${player.score}</h1>`;
        cur = 0;
    }else{
        newQuestion();
        cur++;
    }
});

function newQuestion() {
    h1.innerHTML = `${cur+1} out of ${quizArr.length} Score: ${player.score}`;

    output.innerHTML = '';
    const el = quizArr[cur];

    const que = document.createElement('div');
    const ans = document.createElement('div');

    que.innerHTML = el.question+"?";
    el.options.forEach(option => {
        const div = document.createElement('div');
        div.classList.add('options');
        div.classList.add('optionsCursor');
        div.innerHTML += `${option.response}`;
        holder.push(div);
        div.correct = option.correct;
        div.addEventListener('click', selOption);
        ans.append(div);
    });
       
    output.append(que);
    output.append(ans);
}

function selOption(e) {
    endTurn();
    if(e.target.correct) {
        player.score++;
        h1.innerHTML = `${cur} out of ${quizArr.length} Score: ${player.score}`;
        e.target.style.backgroundColor = 'green';
    }else{
        e.target.style.backgroundColor = 'red';
    }

    btn.style.display = 'block';

    if(cur >= quizArr.length) {
        btn.textContent = 'See Score';
    }else{
        btn.textContent = 'Next Question';
    }
    
}

function endTurn() {

    holder.forEach(div => {
        div.removeEventListener('click', selOption);
        div.style.backgroundColor = '#ddd';
        div.classList.remove('optionsCursor');
    });
}