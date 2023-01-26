class UI {
    constructor() {
        this.btn = document.querySelector('.btn');
        this.output = document.querySelector('.output');
    }

    async getData(url) {

        const res = fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err);
        });

        return await res;

    }
}