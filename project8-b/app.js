const mainURL = 'https://swapi.dev/api/';
const h1 = document.querySelector('h1');
const btn = document.querySelector('.btn');
const inputVal = document.querySelector('.val');
const output = document.querySelector('.output');

inputVal.style.display = 'none';
btn.style.display = 'none';

let endTitle = '';
let endPoint = '';

window.addEventListener('DOMContentLoaded', (e) => { 
    fetch(mainURL)
    .then(res => res.json())
    .then(obj => {
        h1.innerHTML = '';
        console.log(obj);
        for(let key in obj) {
            // console.log(`${key} : ${obj[key]}`);
            const categoryBtn = document.createElement('button');
            categoryBtn.classList.add('category');
            categoryBtn.textContent = key;
            endTitle = key;
            h1.append(categoryBtn);
            categoryBtn.urlz = obj[key]; // link urls to the buttons
            categoryBtn.addEventListener('click', getData);
        }
    })
    .catch(err => {
        console.log(err);
    });
});

function getData(e) {
    output.innerHTML = 'Loading...';
    // console.log(e.target);
    const el = e.target;
    endTitle = el;
    // console.log(el.urlz)
    getJSON(el.urlz);
}

function getJSON(url) {
    endPoint = url;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        buildPage(data);
    });
}

function buildPage(data) {
    // endTitle = endTitle.textContent;
    // endTitle = endTitle[0].toUpperCase() + endTitle.substring(1);
    output.innerHTML = `<h1 class="myTitle">${endTitle}</h1><small style="text-align:center;display:block;">${endPoint}</small>`;
    data.results.forEach(el => {
        // console.log(el)
        const div = document.createElement('div');
        div.classList.add('box');
        div.innerHTML += `${el.name || el.title}`;
        div.addEventListener('click', showItem);
        div.urlz = el.url;
        // console.log(div.urlz)
        output.append(div);
    });

    const pages = document.createElement('div');
    pages.classList.add('pages');
    output.append(pages);
    
    console.log(data);

    if(data.previous){
        const btn2 = document.createElement('button');
        btn2.textContent = 'Previous';
        pages.append(btn2);
        btn2.urlz = data.previous;
        btn2.addEventListener('click', (e) => {
            console.log(data.previous);
            getJSON(data.previous);
        })    
    }

    const total = Math.ceil(data.count/10);
    for(let i=0; i<total; i++) {
        const btn2 = document.createElement('button');
        btn2.textContent = i+1;
        pages.append(btn2);

        let cleanURL = endPoint.split('?');
        console.log(cleanURL)
        let tempURL = cleanURL[0] + '?page=' + (i+1);
        btn2.urlz = tempURL;
        btn2.addEventListener('click', (e) => {
            console.log(tempURL);
            getJSON(tempURL);
        });

    }

    if(data.next){
        const btn2 = document.createElement('button');
        btn2.textContent = 'Next';
        pages.append(btn2);
        btn2.urlz = data.next;
        btn2.addEventListener('click', (e) => {
            console.log(data.next);
            getJSON(data.next);
        })    
    }
    

}

function showItem(e) {
    console.log(e.target);
    const el = e.target;
    output.innerHTML = '';
    fetch(el.urlz)
    .then(res => res.json())
    .then(obj => {
        console.log(obj);
        for (let key in obj) {
            key = key.replaceAll("_", " ");
            output.style.textTransform = 'capitalize';
            output.innerHTML += `<div><span class="bigText">${key}</span> : ${obj[key]}</div>`;
        }
    });
}