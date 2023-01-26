const btn = document.querySelector('.btn');
const output = document.createElement('div');
const url = 'https://discoveryvip.com/shared/test1.json';

document.body.append(output);
output.style.margin = 'auto';

btn.addEventListener('click', (e) => {
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        output.innerHTML = '<h1 style="font-size:40px;width:80%;margin:30px auto">JSON Data</h1>';
        data.forEach(el => {

            const div = document.createElement('div');
            div.classList.add('box');
            output.append(div);

            div.innerHTML += `
            ${el.name.first} ${el.name.last}<br>
            ${el.location.city} ${el.location.country}`;

        })
    })
    .catch(err => {
        console.log(err);
    })
})