class UI {
    constructor() {
        this.h1 = document.querySelector('h1');
        this.inputval = document.querySelector('.val');
        this.div_url = document.querySelector('.url');
        this.output = document.querySelector('.output');
    }

    onPageLoad() {
        window.addEventListener('DOMContentLoaded', () => {
            urls.forEach((el) => {
                const btns = document.createElement('button');
                h1.append(btns);
                btns.textContent = el.title
                btns.addEventListener('click', (e) => {
                    this.myURL(el);
                });
            });
        });
    }

    async myURL(el) {
        const url = el.url;
        div_url.innerHTML = url;
        const response = fetch(url)
        .then(res => res.json())
        .then(data => {
            output.innerHTML = '';
            data[el.arr].forEach(obj => {
                this.maker(obj);
            });
        });

        return await response;
    }

    maker(obj) {
        const div = document.createElement('div');
        div.classList.add('box');
        output.append(div);
        for(let key in obj) {
            div.innerHTML += `
            <div>
                ${key.replace(/_/g, ' ').replace(/^[a-z]/, (chr) => chr.toUpperCase())} : ${obj[key]}
            </div>
        `;
        }
        div.innerHTML += '<br>'
    }
}