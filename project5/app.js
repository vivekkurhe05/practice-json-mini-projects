const urls = [
    {
        'url': 'https://discoveryvip.com/shared/books2.json',
        'title': 'Book List',
        'arr': 'books'
    },
    {
        'url': 'https://discoveryvip.com/shared/1people.json',
        'title': 'Friends List',
        'arr': 'data'
    },
    {
        'url': 'https://discoveryvip.com/shared/coin.json',
        'title': 'BitCoin Currency',
        'arr': 'data'
    }
]
const h1 = document.querySelector('h1');
h1.innerHTML = '';
const inputval = document.querySelector('.val');
const btn1 = document.querySelector('.btn');
const div_url = document.querySelector('.url');
const output = document.querySelector('.output');
window.addEventListener('DOMContentLoaded', () => {
    urls.forEach((el) => {
        const btns = document.createElement('button');
        h1.append(btns);
        btns.textContent = el.title
        btns.addEventListener('click', (e) => {
            myURL(el);
        });
    });
});

function myURL(el) {
    const url = el.url;
    div_url.innerHTML = url;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        output.innerHTML = '';
        data[el.arr].forEach(obj => {
            maker(obj);
        });
    });
}

function maker(obj) {
    const div = document.createElement('div');
    div.classList.add('box');
    output.append(div);
    for(let key in obj) {
        div.innerHTML += `
        <div>
            ${key.replace(/_/g, ' ').replace(/^[a-z]/, (chr) => chr.toUpperCase())} : ${obj[key]}
        </div>
    `;
    }
    div.innerHTML += '<br>'

  
}