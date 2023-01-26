class UI {

    constructor() {
        this.mainURL = 'https://swapi.dev/api/';
        this.h1 = document.querySelector('h1');
        this.inputVal = document.querySelector('.val');
        this.btn = document.querySelector('.btn');
        this.output = document.querySelector('.output');
        this.inputVal.style.display = 'none';
        this.btn.style.display = 'none';
    }

    onPageLoad() {
        this.h1.innerHTML = '';

        fetch(this.mainURL)
        .then(res => res.json())
        .then(obj => {
            console.log(obj);
            for(let key in obj) {
                if(obj.hasOwnProperty(key)){
                    const categoryBtn = document.createElement('button');
                    categoryBtn.classList.add('category');
                    categoryBtn.textContent = key;
                    this.h1.append(categoryBtn);
                    categoryBtn.urlz = obj[key];
                    categoryBtn.addEventListener('click', this.getData);
                }
            }
        });
    }
    
    getData(e) {
        this.output.innerHTML = 'Loading...';
        const el = e.target;
        const url = el.urlz;
        this.getJSON(url);
    }

    getJSON(url) {
        fetch(url)
        .then(res => res.json())
        .then(obj => {
            this.buildPage(obj);
        });
    }

    buildPage(obj) {
        console.log(obj);
        this.output.innerHTML = '';
        obj.results.forEach(el => {
            const div = document.createElement('div');
            div.classList.add('box');
            div.textContent = el.name || el.title;
            div.urlz = el.url;
            this.output.append(div);
            div.addEventListener('click', this.showItem);
        });

        const pages = document.createElement('div');
        pages.classList.add('page');
        this.output.append(pages);

        const totalPages = Math.ceil(obj.count/10);

        if(obj.previous) {
            const preBtn = document.createElement('button');
            preBtn.textContent = 'Previous';
            pages.append(preBtn);
            preBtn.addEventListener('click', (e) => {
                this.getJSON(obj.previous);
            });
        }

        for(let i=0; i<totalPages; i++) {
            const btn2 = document.createElement('button');
            btn2.textContent = (i+1);
            pages.append(btn2);

            let cleanURL = obj.next.split("?");
            let tempURL = cleanURL[0] + "?page=" + (i + 1);
            btn2.addEventListener('click', (e) => {
                this.getJSON(tempURL);
            });
        }

        if(obj.next) {
            const nxtBtn = document.createElement('button');
            nxtBtn.textContent = 'Next';
            pages.append(nxtBtn);
            nxtBtn.addEventListener('click', (e) => {
                this.getJSON(obj.next);
            });
        }

    }

    showItem(e) {
        console.log(e.target)
        const el = e.target;
        
        fetch(el.urlz)
        .then(res => res.json())
        .then(obj => {
            this.output.innerHTML = '';
            console.log(obj);
            for(let key in obj) {
                const title = key.replaceAll("_", " ");
                this.output.style.textTransform = 'capitalize';
                let html = toString.call(obj[key]) == '[object String]' ? obj[key] : JSON.stringify(obj[key]);
                this.output.innerHTML += `<div><span class="bigText">${title}</span> : ${html}</div>`;
            }   
        });
    }

}