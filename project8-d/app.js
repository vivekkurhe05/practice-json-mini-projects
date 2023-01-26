const mainURL = 'https://swapi.dev/api/';
const h1 = document.querySelector('h1');
const inputVal = document.querySelector('.val');
const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
inputVal.style.display = 'none';
btn.style.display = 'none';

h1.innerHTML = '';

window.addEventListener('DOMContentLoaded', (e) => {

    fetch(mainURL)
    .then(res => res.json())
    .then(obj => {
        for(let key in obj) {
            if(obj.hasOwnProperty(key)) {
                const btn2 = document.createElement('button');
                btn2.textContent = key;
                h1.append(btn2);
                btn2.urlz = obj[key];
                btn2.addEventListener('click', getData);
            }
        }
    });
});

function getData(e) {
    output.innerHTML = 'Loading...';

    const el = e.target;
    const url = el.urlz;

    getJSON(url);
}

function getJSON(url) {

    fetch(url)
    .then(res => res.json())
    .then(data => {
        buildPage(data);
    });
}

function buildPage(data) {
    output.innerHTML = '';

    console.log(data.results);
    data.results.forEach(obj => {
        const div = document.createElement('div');
        div.classList.add('box');
        output.append(div);
        const title = obj.name || obj.title;
        div.textContent = title;
        div.urlz = obj.url;
        div.addEventListener('click', showItem);
    });

    const pages = document.createElement('div');
    pages.classList.add('page');
    output.append(pages);

    const totalPages = Math.ceil(data.count/10);
    console.log(data);

    if(data.previous) {
        const preBtn = document.createElement('button');
        preBtn.textContent = 'Previous';
        pages.append(preBtn);
        preBtn.addEventListener('click', (e) => {
            getJSON(data.previous);
        });
    }

    for (let x=0; x<totalPages; x++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = (x+1);
        pages.append(pageBtn);

        let cleanURL = data.next.split('?');
        let tempURL = cleanURL[0] + "?page=" + (x+1);
        pageBtn.addEventListener('click', (e) => {
            getJSON(tempURL);
        });
    }

    if(data.next) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        pages.append(nextBtn);
        nextBtn.addEventListener('click', (e) => {
            getJSON(data.next);
        });
    }

}

function showItem(e) {
    const url = e.target.urlz;

    output.innerHTML = '';

    fetch(url)
    .then(res => res.json())
    .then(obj => {
        for(let key in obj) {
            console.log(key+" : "+typeof (obj[key]));
            let html = typeof (obj[key]) === 'string' ? obj[key] : JSON.stringify(obj[key]);
            output.innerHTML += `
                <div><span>${key}</span> : ${html}</div>
            `;
        }
    });
}