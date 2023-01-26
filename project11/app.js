// const baseURL = 'http://api.countrylayer.com/v2/all';
const baseURL = 'data.json';
const h1 = document.querySelector('h1');
const inputVal = document.querySelector('.val');
const btn = document.querySelector('.btn');
const output = document.querySelector('.output');

h1.textContent = 'Load Country Info';
inputVal.style.display = 'none';
btn.textContent = 'Load Pages';

// const SECRET_TOKEN = 'b7e352952762b46e3328a1fd06b4ec21';
const page = {json: {}, pageNum: 1, perPage: 10, arr: []};

btn.addEventListener('click', (e) => {

    // const url = baseURL + `?access_key=${SECRET_TOKEN}`;
    fetch(baseURL)
    .then(res => res.json())
    .then(data => {
        createPage(data);

        // click load pages button repeatedly and check logs on console
        page.pageNum++;
        if(page.pageNum > 25) page.pageNum = 1;
    });
});

function createPage(data) {

    page.arr = [];
    for(let i=0; i<data.length; i+=page.perPage) {
        let tempArr = data.slice(i, i+page.perPage)
        page.arr.push(tempArr);
    }
    
    loadPages();
}

function loadPages() {

    output.innerHTML = '';
    console.log(page.pageNum, page.arr[page.pageNum-1]);
    page.arr[page.pageNum-1].forEach((arr) => {
        console.log(arr);
        pageEl(arr);
    });

    loadPagination();
}

function loadPagination() {
    const pages = document.createElement('div');
    pages.classList.add('pages');
    output.append(pages);

    for(let i=0; i<page.arr.length; i++) {
        const pageBtn = document.createElement('div');
        pageBtn.classList.add('pgs');
        pageBtn.textContent = (i+1);
        pages.append(pageBtn);
        if(page.pageNum == (i+1)) {
            pageBtn.style.backgroundColor = 'red';
        }

        pageBtn.addEventListener('click', (e) => {
            page.pageNum = i + 1;
            loadPages();
        });
    }
}

function pageEl(data) {

    const main = document.createElement('div');
    main.classList.add('box');
    output.append(main);

    const title = document.createElement('div');
    title.innerHTML = `<h2>${data.name}</h2>`;
    main.append(title);

    const flag = document.createElement('img');
    flag.setAttribute('src', data.flag);
    main.append(flag);

    let html1 = `<div>Population : ${data.population}</div>`;
    html1 += `<div>Capital : ${data.capital} ${data.region}</div>`;

    const stats = document.createElement('div');
    stats.innerHTML = html1;
    main.append(stats);

}