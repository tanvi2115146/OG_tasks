const data = [
    { a: 10, b: [5, 10], e: "hello" },
    { x: 2, y: { z: [1, 2, 3], w: 4 }, q: "test" },
    { p: { q: 8 }, s: [2, 3, 4] }
    ]; 


function flatten(arr){
    return arr.map(obj=>
        Object.values(obj)
        .flat(obj)
        .filter((value)=>typeof val=== 'number')
        .reduce((sum,num)=>{
            return sum+num;
        },0)
    )
}    
console.log(flatten(data));