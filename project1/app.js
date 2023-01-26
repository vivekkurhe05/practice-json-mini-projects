const h1 = document.querySelector('h1');
const btn = document.querySelector('.btn');
const output = document.createElement('div');
const val1 = document.querySelector('.val1');
const val2 = document.querySelector('.val2');
val2.value = 1;

document.body.append(output);

window.addEventListener('DOMContentLoaded', () => {

    fetch('list.json')
    .then(res => res.json())
    .then(data => {

        console.log(data);
        data.forEach((obj) => {
            const div = document.createElement('div');
            div.classList.add('box');
            div.innerHTML = `${obj.name} #${obj.guests}<span class="xbtn">X</span>`;
            output.append(div);

            if(obj.status) {
                div.style.color = "green";
            }else{
                div.style.color = "red";
            }
        })
    });
});

btn.addEventListener('click', () => {

    if(val1.value.length > 3) {
        const div = document.createElement('div');
        div.classList.add('box');
        div.innerHTML = `${val1.value} #${val2.value}<span class="xbtn">X</span>`;
        output.append(div);
    }
    
});