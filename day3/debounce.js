function debounce(func, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout); 
        timeout = setTimeout(func, delay); 
    };
}

function hello() {
    console.log('Hello!');
}

const debouncedHello = debounce(hello, 2000);

debouncedHello();
 
setTimeout(debouncedHello,4000)