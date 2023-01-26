const baseurl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=';
const inputVal = document.querySelector('.val');
const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
inputVal.value = 'hello';

btn.addEventListener('click', getData);

function getData(e) {
    const searchTerm = inputVal.value;
    const url =  baseurl + encodeURIComponent(searchTerm);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showData(data.query);
    });
}

function showData(data) {
    output.innerHTML = `
        <div>Results for ${inputVal.value}<div>
        <div>Total Results : ${data.searchinfo.totalhits}</div>
    `;
    data.search.forEach(infoObj => {
        const main = document.createElement('div');
        main.classList.add('box');
        const link = `https://en.wikipedia.org/wiki?curid=${infoObj.pageid}`;
        main.innerHTML += `
            <h2><a href="${link}" target="_blank">${infoObj.title}</a></h1>
            <div>Page ID ${infoObj.pageid} | Size ${infoObj.size} | WordCount ${infoObj.wordcount}
            </div>
            ${infoObj.snippet}  
        `;
        output.append(main);
    });
}