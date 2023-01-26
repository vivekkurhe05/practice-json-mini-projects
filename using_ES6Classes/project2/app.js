const ui = new UI;
const url = 'https://discoveryvip.com/shared/test1.json';

ui.btn.addEventListener('click', (e) => {
    
    ui.getData(url).then(data => {
        ui.output.innerHTML = '';
        data.forEach(el => {
            console.log(el)
            maker(el);
        });
    });
});

function maker(el) {
    const div = document.createElement('div');
    div.classList.add('box');
    ui.output.append(div);
    div.innerHTML = `
    ${el.name.first} ${el.name.last}<br>
    ${el.location.city}, ${el.location.country}
    `;
}