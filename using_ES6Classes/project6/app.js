const ui = new UI;
const urls = [
    {
        'url': 'https://discoveryvip.com/shared/books2.json',
        'title': 'Book List',
        'arr': 'books'
    },
    {
        'url': 'https://discoveryvip.com/shared/1people.json',
        'title': 'Friends List',
        'arr': 'data'
    },
    {
        'url': 'https://discoveryvip.com/shared/coin.json',
        'title': 'BitCoin Currency',
        'arr': 'data'
    }
];

ui.onPageLoad();
ui.myURL()