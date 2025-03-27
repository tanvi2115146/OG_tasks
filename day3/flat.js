const complexData = [
    [1, 2],
    [3, [4, 5]],
    [[6], [[7, 8], 9]],
    10
  ];

  //flat
let res=(complexData.flat());
let output =res.flat();
console.log(output.flat());


//flatMap
const arr=complexData.flatMap(x=>x)
const arr2=arr.flatMap((x)=>x)
const arr3=arr2.flatMap((x)=>x)
console.log(arr3)

//without

// function flatt(arr){
//     arr.reduce((acc,curr)=>{

        
//     },[])
// }
    
    
