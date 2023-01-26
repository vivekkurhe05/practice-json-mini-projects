const mainURL = 'https://swapi.dev/api/';
const h1 = document.querySelector('h1');
const inputVal = document.querySelector('.val');
const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
inputVal.style.display = 'none';
btn.style.display = 'none';

window.addEventListener('DOMContentLoaded', () => {
    h1.innerHTML = '';

    fetch(mainURL)
    .then(res => res.json())
    .then(obj => {
        console.log(obj);
        for(let key in obj) {
            if(obj.hasOwnProperty(key)){
                const categoryBtn = document.createElement('button');
                categoryBtn.classList.add('category');
                categoryBtn.textContent = key;
                h1.append(categoryBtn);
                categoryBtn.urlz = obj[key];
                categoryBtn.addEventListener('click', getData);
            }
        }
    });
});

function getData(e) {
    output.innerHTML = 'Loading...';

    const el = e.target;
    getJSON(el.urlz);
}

function getJSON(url) {
    
    fetch(url)
    .then(res => res.json())
    .then(obj => {
        buildPage(obj);
    });
}

function buildPage(obj) {
    console.log(obj);
    output.innerHTML = '';
    obj.results.forEach(el => {
        const div = document.createElement('div');
        div.classList.add('box');
        div.textContent = el.name || el.title;
        div.urlz = el.url;
        output.append(div);
        div.addEventListener('click', showItem);
    });

    const pages = document.createElement('div');
    pages.classList.add('page');
    output.append(pages);

    const totalPages = Math.ceil(obj.count/10);

    if(obj.previous) {
        const preBtn = document.createElement('button');
        preBtn.textContent = 'Previous';
        pages.append(preBtn);
        preBtn.addEventListener('click', (e) => {
            getJSON(obj.previous);
            console.log(obj.previous);
        });
    }

    for(let i=0; i<totalPages; i++) {
        const btn2 = document.createElement('button');
        btn2.textContent = (i+1);
        pages.append(btn2);

        let cleanURL = obj.next.split("?");
        let tempURL = cleanURL[0] + "?page=" + (i + 1);
        btn2.addEventListener('click', (e) => {
            getJSON(tempURL);
        });
    }

    if(obj.next) {
        const nxtBtn = document.createElement('button');
        nxtBtn.textContent = 'Next';
        pages.append(nxtBtn);
        nxtBtn.addEventListener('click', (e) => {
            getJSON(obj.next);
            console.log(obj.next);
        });
    }

}

function showItem(e) {
    console.log(e.target)
    const el = e.target;
    
    fetch(el.urlz)
    .then(res => res.json())
    .then(obj => {
        output.innerHTML = '';
        console.log(obj);
        for(let key in obj) {
            const title = key.replaceAll("_", " ");
            output.style.textTransform = 'capitalize';
            let html = toString.call(obj[key]) == '[object String]' ? obj[key] : JSON.stringify(obj[key]);
            output.innerHTML += `<div><span class="bigText">${title}</span> : ${html}</div>`;
        }   
    });
}