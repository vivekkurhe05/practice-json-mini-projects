const baseurl = 'http://api.wikimapia.org/?key=example&function=place.getnearest&key=9C0E811A-33BEF4DE-5D674FB5-A75E2878-3A3CE17D-8FBCF497-7A8F1075-6477AC84&format=json';
const inputVal1 = document.querySelector('.input1');
const inputVal2 = document.querySelector('.input2');
const btn = document.querySelector('.btn');
const output = document.querySelector('.container');
inputVal1.value = '48.858252';
inputVal2.value = '2.29451';

btn.addEventListener('click', getData);

function getData(e) {

    let lat = inputVal1.value;
    let lon = inputVal2.value;
    const url = baseurl +  `&lat=${lat}&lon=${lon}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        showData(data.places);
    });

}

function showData(data) {
    console.log(data);

    data.forEach(info => {
        const main = document.createElement('div');
        main.classList.add('box');
        main.innerHTML += `
            <div>Title ${info.title}<br>
            ${info.urlhtml}</div>
        `;
        output.append(main);
    });
}