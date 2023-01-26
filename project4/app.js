const url = `http://api.wikimapia.org/?key=example&function=place.getnearest&key=9C0E811A-33BEF4DE-5D674FB5-A75E2878-3A3CE17D-8FBCF497-7A8F1075-6477AC84&format=json`;
const inputval1 = document.querySelector('.val1');
const inputval2 = document.querySelector('.val2');
const output = document.querySelector('.output');
inputval1.value = '48.858252';
inputval2.value = '2.29451';
const btn = document.querySelector('.btn');
btn.addEventListener('click', (e) => {
    const lat = inputval1.value;
    const lon = inputval2.value;
    const new_url = url+`&lat=${lat}&lon=${lon}`;
    fetch(new_url)
    .then(res => res.json())
    .then(data => {
        output.innerHTML = '';
        data.places.forEach((el) => {
            const div = document.createElement('div');
            div.classList.add('box');
            output.append(div);
            div.innerHTML = `
                <p>Title ${el.title}</p>
                <a href="${el.url}">${el.title}</p><br>
            `;
        });
    })
    .catch(err => {
        console.log(err);
    });
});