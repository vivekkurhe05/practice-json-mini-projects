const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=";
const inputVal = document.querySelector('.val');
const btn = document.querySelector('.btn');
const output = document.querySelector('.output');

btn.addEventListener('click', (e) => {
    output.innerHTML = 'Loading...';
    let url1 = '';
    if(inputVal.value === ''){
        url1 = url + 'javascript';
    }else {
        url1 = url + inputVal.value;
    }
    
    fetch(url1)
    .then(res => res.json())
    .then(data => {

        output.innerHTML = `Results for ${inputVal.value}<br>Total Results : ${data.query.searchinfo.totalhits}`;
        console.log(data);
        data.query.search.forEach((arr) => {
            maker(arr);
        });
    })
    .catch(err => {
        output.innerHTML = err; 
    })
});

function maker(el) {
    const div = document.createElement('div');
    div.classList.add('box');
    output.append(div);
    console.log(el);

    div.innerHTML += `
        <h2><a href="https://en.wikipedia.org/wiki?curid=${el.pageid}">${el.title}</a></h2><br>
        <p>${el.pageid} | ${el.size} | ${el.wordcount}</p>
        <p>${el.snippet}</p>
    `;
}