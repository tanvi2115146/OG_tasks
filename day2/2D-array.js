let arr=[
    [1,2,3],
    [4,5,6],
    [7,8,9],
]

function addSum(arr){
    let sum=0;
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            sum+=arr[i][j];
        }
    }
    return sum;
}

console.log(addSum(arr));


