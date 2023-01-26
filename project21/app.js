const output = document.querySelector('.container');
const baseurl = 'https://reqres.in/api/';
const page = {pg:1};

window.addEventListener('DOMContentLoaded', loadData);

async function loadData() {
    const para = "users?page="+page.pg;
    const url = baseurl + para;
    const res = await fetch(url);
    const data = await res.json();
    buildPage(data);
}

function buildPage(data) {
    output.innerHTML = '';

    const main = document.createElement('div');
    main.classList.add('output');
    output.append(main);

    data.data.forEach(info => {

        const div = addUser(info);
        main.append(div);
        div.addEventListener('click', (e) => {
            output.innerHTML = '';
            userPage(info.id);
        });
    });

    for(let i=0; i<data.total_pages; i++) {
        const pageBtn = document.createElement('span');
        pageBtn.classList.add('pages');
        pageBtn.textContent = (i+1);
        main.append(pageBtn);

        if(data.page == (i+1)){
            pageBtn.style.backgroundColor = 'red';
            pageBtn.style.color = 'white';
        }

        pageBtn.addEventListener('click', async (e) => {
            page.pg = (i+1);
            loadData();
        });
    }
}

function addUser(info){

    const main = document.createElement('div');
    main.classList.add('output');

    const div = document.createElement('div');
    div.classList.add('box');

    const div1 = document.createElement('div');
    div1.textContent = info.first_name+" "+info.last_name +" "+ info.id;
    div.append(div1);

    const div2 = document.createElement('div');
    div2.textContent = info.email;
    div.append(div2);

    const img = document.createElement('img');
    img.setAttribute('src', info.avatar);
    div.append(img);

    return div;

}

async function userPage(id){
    const para = "users/"+id;
    const url = baseurl + para;
    const res = await fetch(url);
    const data = await res.json();

    createPage(data.data);
}

function createPage(data) {
    const main = document.createElement('div');
    main.classList.add('output');
    output.append(main);

    const div = addUser(data);
    div.setAttribute('contenteditable', true);

    const updateBtn = document.createElement('button');
    updateBtn.classList.add('updateBtn');
    updateBtn.textContent = 'Update';
    updateBtn.setAttribute('contenteditable', false);
    div.append(updateBtn);

    main.append(div);

}