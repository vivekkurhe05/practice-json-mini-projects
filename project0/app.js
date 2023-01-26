const h1 = document.querySelector('h1');
const inputVal = document.querySelector('.val');
const btn = document.querySelector('.btn');
const divs = document.querySelectorAll('.output');

h1.style.color = 'red';
inputVal.value = 'div';

inputVal.addEventListener('click', (e) => {
    if(e.target.getAttribute("type") == "text") {
        e.target.setAttribute("type", "number")
    }else{
        e.target.setAttribute("type","text");
    }
});

divs.forEach((div,i) => {
    div.innerHTML = "";
    div.style.color = "blue";
    div.innerHTML += `<h2>Hello World ${inputVal.value}${i}</h2>`;
});

h1.addEventListener('click', (e) => {
    e.target.style.color = "white";
    if(e.target.textContent == "JavaScript") {
        e.target.style.background = "blue";
        e.target.innerHTML = "test";
    }else{
        e.target.style.background = "red";
        e.target.innerHTML = "JavaScript";
    }
    
});

let counter = 0;
btn.addEventListener('click', (e) => {
    counter++;
    const div = document.createElement('div');
    div.textContent = `div ${counter}`;
    div.style.color = "blue";
    document.body.append(div);

    div.addEventListener('click', (e) => {
        e.target.classList.toggle("box");
    });
});