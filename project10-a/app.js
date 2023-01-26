const baseurl = 'https://api.stackexchange.com';
const h1 = document.querySelector('h1');
h1.textContent = 'Stackexchange API tester';
const val = document.querySelector('.val');
const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
const output1 = document.createElement('div');
output1.classList.add('output1');
document.body.append(output1);
output1.append(h1);
output1.append(val);
output1.append(btn);
output1.append(output);

window.addEventListener('DOMContentLoaded', (e) => {
   pageLoad();
});

function pageLoad() {
    const url = baseurl + '/2.3/questions?order=desc&sort=activity&site=stackoverflow';
   fetch(url)
   .then(res => res.json())
   .then(data => {
    console.log(data)
    outputItems(data.items)
})
}

function outputItems(data) {
    data.forEach(el => {
        outputPage(el)
    })
}

function outputPage(el) {
    const div = document.createElement('div');
    div.classList.add('box');
    div.innerHTML += `
        <div>${el.title}</div><hr>
        <div>Answers ${el.score}</div>
        <div>QID ${el.question_id}</div>
    `
    el.tags.forEach(tag => {
        const span = document.createElement('span');
        span.classList.add('tag');
        div.append(span)
        span.innerHTML += tag;
    })

    output.append(div);
}