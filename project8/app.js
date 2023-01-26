const url = 'https://swapi.dev/api/';
const btn = document.querySelector('.btn');
const h1 = document.querySelector('h1');
const inputVal = document.querySelector('.val');
const output = document.querySelector('.output');
inputVal.style.display = 'none';
btn.style.display = 'none';
h1.innerHTML = '';

window.addEventListener('DOMContentLoaded', (e) => {
    fetch(url)
    .then(res => res.json())
    .then(obj => {
        getURL(obj); 
    });
});

function getURL(obj){
    for(let key in obj){
        console.log(`${key} : ${obj[key]}`);

        const btn1 = document.createElement('button');
        h1.append(btn1);
        btn1.textContent = key;
        btn1.addEventListener('click', (e) => {
            
            showButtons(obj, key)
            
        });
    }
}

function showButtons(obj, key) {
    output.innerHTML = 'Loading...';
    fetch(obj[key]) // url
    .then(res => res.json())
    .then(data => {
        console.log(data)
        output.innerHTML = '';
        
        data.results.forEach(elObj => {
            const divs = document.createElement('div');
            divs.classList.add('box');
            output.append(divs);
            divs.innerHTML += `${elObj.name || elObj.title}`
            divs.addEventListener('click', (e) => {
                output.innerHTML = '';
                // console.log(elObj);
                for(let prop in elObj){
                    output.innerHTML += `${prop.replaceAll("_"," ")} : ${elObj[prop]}<br>`
                }
                
            });
               
        });

        const pages = document.createElement('div');
        output.append(pages);
        if(data.previous){
            const btn2 = document.createElement("button");
            btn2.textContent = "Previous";
            pages.append(btn2);
            btn2.urlz = data.previous;
            btn2.addEventListener('click', (e) => {
                console.log(data.previous);
                
            });
        }

        if(data.next){
            const btn2 = document.createElement("button");
            btn2.textContent = "Next";
            pages.append(btn2);
            btn2.urlz = data.next;
            btn2.addEventListener('click', (e) => {
                console.log(data.next);
                
            });
        }

    });
}