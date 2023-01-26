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
const inputVal = document.querySelector('.val');
inputVal.style.display = 'none';
const btn = document.querySelector('.btn');
btn.style.display = 'none';
const output = document.querySelector('.output');

h1.innerHTML = '';

urls.forEach(myObj => {
    const btnName = myObj.title;
    const btn1 = document.createElement('div');
    btn1.classList.add('categories');
    btn1.textContent = btnName;
    h1.append(btn1);
    btn1.addEventListener('click', (e) =>{
        myURL(myObj);
    });
});

function myURL(myObj) {
    let url = myObj.url;
    output.innerHTML = url + '<br>';

    fetch(url)
    .then(res => res.json())
    .then(obj => {
        let prop = myObj.arr;
        maker(obj[prop])
    });
}

function maker(arr) {
    arr.forEach(obj => {
        for(let key in obj) {
            let html = typeof obj[key] == 'object' ? JSON.stringify(obj[key]) : obj[key];
            output.innerHTML += `<div class="info">${key} : ${html}</div>`;
        }
    });
}