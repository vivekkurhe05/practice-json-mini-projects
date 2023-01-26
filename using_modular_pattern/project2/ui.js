const UICtrl = (function() {

    const UISelectors = {
        btn: ".btn",
        output: ".output",
    }
    
    return {
        getData: async function (url) {
            const res = fetch(url)
            .then(res => res.json())
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });

            return await res;
        },
        getSelectors: function() {
            return UISelectors;
        },
        getItemInput: function() {
            return{
                btn: document.querySelector(UISelectors.btn),
                output: document.querySelector(UISelectors.output)
            }
            
        }
    }
})();


UICtrl.getData('https://discoveryvip.com/shared/test1.json').then(data => {
    const input = UICtrl.getItemInput();
    input.btn.addEventListener('click', (e) => {
        data.forEach(el => {
            console.log(el);
            const div = document.createElement('div');
            div.classList.add('box');
            input.output.append(div);
            div.innerHTML += `
            ${el.name.first} ${el.name.last}<br>
            ${el.location.city}, ${el.location.country}
            `;
        });
    })
});

