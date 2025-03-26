
//reduce
const arr = [{ a: 1 }, { b: 2 }, { e: 3 },{d:3}];

const sum = arr.reduce((acc, obj) => {
    const key = Object.keys(obj)[0]; 
    return acc + obj[key]; 
}, 0);

console.log(sum);


//reduce

const arr1 = [1,2,3,45,6];
const value = arr1.reduce(function(max,curr){
      if(curr>max){
        max=curr;
      }
      return max;
},0)
console.log(value);



//find
const found = arr.find(obj => Object.values(obj)[0] === 3);
console.log(found);


const index = arr.findIndex(obj => Object.values(obj)[0] === 2);
console.log(index);