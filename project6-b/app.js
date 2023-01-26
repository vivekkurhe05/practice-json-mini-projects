const url = 'https://randomuser.me/api/';
const h1 = document.querySelector('h1');
const inputVal = document.querySelector('.val');
const btn = document.querySelector('.btn');
const output = document.querySelector('.output');


inputVal.value = "10";

btn.addEventListener('click', (e) => {
    const mainURL = url + `?results=${inputVal.value}`;
    fetch(mainURL)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        output.innerHTML = `
        <div>Seed : ${data.info.seed}</div>
        <div>Results: ${data.info.results}</div>
        `;
        adder(data);
    });
});

function adder(data) {
    
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('dataContainer');
    output.append(mainDiv);

    data.results.forEach(obj => {
        const div = document.createElement('div');
        div.classList.add('box');
        mainDiv.append(div);
        div.innerHTML += `
        <div class="upper_data">${obj.name.title} ${obj.name.first} ${obj.name.last}<br>
        ${obj.email}<br>
        ${obj.dob.age}<br></div>
        <div><img src="${obj.picture.large}"></img></div>
        ${obj.location.city}, ${obj.location.state}, ${obj.location.country}
        `; 
    })
}