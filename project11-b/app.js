const url = "https://restcountries.com/v2/all";
const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
const page = {page: 1, per: 10, arr: []};

btn.addEventListener('click', (e) => {
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        createPages(data);
    });
});

function createPages(data) {
    console.log(data);
    let tempArr = [];
    page.arr = [];
    for(let i=0; i<data.length; i+=page.per) {
        tempArr = data.slice(i, i+page.per);
        page.arr.push(tempArr);
    }
    // console.log(page);
    loadPages();
}

function loadPages() {
    output.innerHTML = '';

    page.arr[page.page -1].forEach(dataObj => {
        pageEl(dataObj);
    });
    // page.page++;
    loadPagination();
}

function loadPagination() {
    const pages = document.createElement('div');
    page.arr.forEach((arr, index) => {
        const btn = document.createElement('button');
        btn.classList.add('pageBtn');
        btn.textContent = index+1;
        pages.append(btn);

        btn.addEventListener('click', (e) => {
            page.page = index + 1;
            loadPages();
        });
    });

    output.append(pages);
}

function pageEl(dataObj) {
    
    console.log(dataObj);

    const main = document.createElement('div');
    main.classList.add('box');

    const countryName = document.createElement('div');
    countryName.classList.add('title');
    countryName.textContent = dataObj.name;
    main.append(countryName);

    const countryFlag = document.createElement('img');
    countryFlag.setAttribute('src', dataObj.flags.png)
    main.append(countryFlag);

    const countryPopulation = document.createElement('div');
    countryPopulation.textContent = dataObj.population;
    main.append(countryPopulation);

    const countryCapital = document.createElement('div');
    countryCapital.textContent = dataObj.capital + ", " + dataObj.region;
    main.append(countryCapital);

    output.append(main);

}