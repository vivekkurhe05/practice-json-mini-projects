const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
const url = 'https://discoveryvip.com/shared/test1.json';

btn.addEventListener('click', showUserData);

function showUserData(e) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        maker(data);
    });
}

function maker(data) {
    console.log(data);
    output.innerHTML = '<h1>JSON Data</h1>';
    data.forEach((infoObj, i) => {
        const div = document.createElement('div');
        let bgColor = i%2 === 0 ? "rgb(238, 238, 238)" : "#ffffff";
        div.style.backgroundColor = bgColor;
        div.innerHTML += `
            <div>${infoObj.name.first} ${infoObj.name.last}</div>
            <div>${infoObj.location.city}, ${infoObj.location.country}</div>
        `
        output.append(div);

    });
}