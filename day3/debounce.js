// Debounce function
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function search(query) {
    console.log('Searching for:', query);
}


const dSearch = debounce(search, 100);

dSearch('Hello');
dSearch('Hello, ');
dSearch('Hello, World!');