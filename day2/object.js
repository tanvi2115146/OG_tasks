function multiplyValue(arr) {
    return arr.map((obj, index) => {
        let newObj = {};
        for (let key in obj) {
            newObj[key] = obj[key] * index;
        }
        return newObj;
    });
}

const input = [{ a: 3}, { b: 4 },{c:9}];
const output = multiplyValue(input);
console.log(output); 