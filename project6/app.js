const url = 'https://randomuser.me/api/';
const inputVal = document.querySelector('.val');
const btn = document.querySelector('.btn');
const output = document.querySelector('.output');

inputVal.setAttribute('value', '5')

btn.addEventListener('click', (e) => {
    output.innerHTML = 'Loading...';
    fetch(url+`?results=${inputVal.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.results);
        output.innerHTML = '';
        data.results.forEach((arr) => {
            maker(arr);
        })
    });
});

function maker (arr) {
    const title = arr.name.title;
    const firstname = arr.name.first;
    const lastname = arr.name.last;
    const email = arr.email;
    const age = arr.registered.age;
    const photo = arr.picture.large;
    const city = arr.location.city;
    const state = arr.location.state;
    const country = arr.location.country;
    output.innerHTML += `
        <div class='img_container'>
            <p>
                ${title} ${firstname} ${lastname}<br>
                ${email}<br>
                Age : ${age}
            </p>
            <img src='${photo}'>
            <p>
                ${city} ${state} ${country}
            </p>
        </div>
    `;
}