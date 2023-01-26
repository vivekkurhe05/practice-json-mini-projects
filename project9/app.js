const baseURL = 'https://opentdb.com/api.php?';
const h1 = document.querySelector('h1');
const inputVal = document.querySelector('.val');
const btn1 = document.querySelector('.btn');
const output = document.querySelector('.output');

h1.textContent = 'Trivia DataBase Game';

const game = {ques:[], question:0, eles:[]};

window.addEventListener('DOMContentLoaded', (e) => {
    inputVal.setAttribute('type', 'number');
    inputVal.value = '1';
    btn1.textContent = 'Start Game';
});

btn1.addEventListener('click', (e) => {

    const url = baseURL + `amount=${inputVal.value}`;
    popPage(url);
});

function popPage(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        game.ques = data.results;
        console.log(data.results)
        outputPage();
    });
}

function outputPage() {
    console.log(game);
    output.innerHTML = '';
    let question = game.ques[game.question];
    game.question++; // move to next question;
    output.innerHTML = `${question.question}`
}

// function loadQuestions(ques) {
//     console.log(ques);
//     h1.textContent = inputVal.value + " question(s) selected";
//     inputVal.style.display = 'none';
//     btn.style.display = 'none';
//     output.innerHTML = '';

//     showQuestions(ques);
// }

// function showQuestions(ques) {
//     const queDiv = document.createElement('div');
//     output.append(queDiv);

//     const ansDiv = document.createElement('div');
//     output.append(ansDiv);
//     ques.forEach(que => {
//         // console.log(que);
//         obj.ques.push(que.question);
//         console.log(obj);
//         queDiv.innerHTML += `${que.question}<br>`;

//         que.incorrect_answers.forEach(ans => {
//             obj.all_answers.push(ans);
//         });
//         let index = Math.floor(Math.random() * (obj.all_answers.length+1));
//         obj.all_answers.splice(index,0,que.correct_answer);
//         obj.all_answers.forEach(ans => {
//             const btn2 = document.createElement('button');
//             ansDiv.append(btn2);
//             btn2.textContent = ans;

//             btn2.addEventListener('click', (e) => {
//                 const el = e.target;
//                 if(el.textContent === que.correct_answer) {
//                     nextQuestion('correct answer');
//                 }else{
//                     nextQuestion('wrong answer');
//                 }
//             });
//         });
        
//     });
// }