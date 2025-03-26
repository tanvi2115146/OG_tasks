//map

let r1=[45,34,78,23,90]

const r2=Array.prototype.map(r1,(x)=>x*2);
console.log(r2); 


//lastindex

function myLastIndexOf(arr, callback) {
    for (let i = arr.length - 1; i >= 0; i--) { 
        if (callback(arr[i], i, arr)) {
            return i; 
        }
    }
    return -1; 
}


const nums = [1, 2, 3, 2, 4, 2];

const lastIndex = myLastIndexOf(nums, num => num === 3);
console.log(lastIndex); 



//objectkeys

function myObjectKeys(obj) {
    return Object.keys(obj); 
}


const person = { name: "John", age: 30, city: "New York" };

console.log(myObjectKeys(person)); 




//sum of alll values of obj

function sumObj(arr) {
    return arr.map(obj => 
        Object.values(obj).reduce((sum, num) => sum + num, 0)
        
    );
}

const input = [{ a: 1, b: 2 }, { x: 5, y: 10 }, { p: 3, q: 7, r: 1 }];

const output = sumObj(input);
console.log(output);



//only numbers to add of an object

function numAdd(arr){
    return arr.map(obj =>
        Object.values(obj)
            .filter(value => typeof value === 'number')
            .reduce((sum,num)=>sum + num,0)
        );
}

let arr = [{ a: 1, b: 4 }, { b: 2, c: "hello" }, { x: 10, y: 20, z: "test" }];
console.log(numAdd(arr));





function Add(arr){
    return arr.map(obj =>
        (Object.values(obj)|| arr.values())
            .filter(value => typeof value === 'number'||'object')
            .reduce((sum,num)=>sum + num,0)
        );
}
let value=[
        { a: 10, b: [5, { c: 3, d: 7 }], e: "hello" },
        { x: 2, y: { z: [1, 2, 3], w: 4 }, q: "test" },
        { p: { q: { r: 6 } }, s: [2, 3, 4] }
    ]

console.log(Add(value));