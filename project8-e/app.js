const baseurl = 'https://swapi.dev/api/'
const h1 = document.querySelector('h1');
const output = document.querySelector('.output');
const btn = document.querySelector('.btn');
btn.style.display = 'none';
h1.innerHTML = '';
let endTitle = '';
let endPoint = '';

window.addEventListener('DOMContentLoaded', (e) => {
    fetch(baseurl)
    .then(res => res.json())
    .then(obj => {
        for(let key in obj) {
            const btn1 = document.createElement('div');
            btn1.classList.add('catBtn');
            btn1.textContent = key;
            btn1.urlz = obj[key];
            btn1.category = key;
            h1.append(btn1);
            btn1.addEventListener('click', getJSON);
        }
    });
});

function getJSON(e) {
    const btnz = e.target;
    const url = btnz.urlz;
    endTitle = btnz.category;
    endPoint = url;
    getURL(url)
    
}

function getURL(url) {
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        buildPage(data);
    });
}
function buildPage(data) {
    endTitle = endTitle[0].toUpperCase() + endTitle.slice(1);
    output.innerHTML = `
        <h1 class="myTitle">${endTitle}</h1><br>
        <small style="display:block;text-align:center;">${endPoint}</small>
    `;

    data.results.forEach(obj => {
        const div = document.createElement('div');
        div.classList.add('box');
        div.textContent = obj.name || obj.title;
        output.append(div);
        div.addEventListener('click', (e) => {
            showData(obj);
        });
    });

    const page = document.createElement('div');
    page.classList.add('pages');
    output.append(page);

    if(data.previous) {
        const preBtn = document.createElement('button');
        preBtn.textContent = 'Previous';
        preBtn.urlz = data.previous;
        page.append(preBtn);
        preBtn.addEventListener('click', (e) => {
            const pbtn = e.target;
            let pgUrl = pbtn.urlz;
            getURL(pgUrl)
        });
    }

    const total = Math.ceil(data.count / 10);

    for(let i=0; i<total; i++) {
        const pageBtns = document.createElement('button');
        pageBtns.textContent = (i+1);
        const splitURL = data.next.split('?');
        const url = splitURL[0] + '?page=';
        pageBtns.urlz = url;
        page.append(pageBtns);
        pageBtns.addEventListener('click', (e) => {
            const pgBtn = e.target;
            let pgUrl = pgBtn.urlz + (i+1);
            getURL(pgUrl);
        });
    }

    if(data.next) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.urlz = data.next;
        page.append(nextBtn);
        nextBtn.addEventListener('click', (e) => {
            const nbtn = e.target;
            let pgUrl = nbtn.urlz;
            getURL(pgUrl)
        });
    }

}

function showData(obj){
    output.innerHTML = '';
    for(let key in obj) {
        console.log(key+" : "+typeof obj[key])
        key = key.replaceAll("_", " ");
        let html = typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key]);
        output.innerHTML += `<div style="text-align:center;"><span class="bigText">${key}</span> : ${html}</div>`;
    }
}