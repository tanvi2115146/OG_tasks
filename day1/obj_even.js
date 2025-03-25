let obj={
    'a':'11',
    'b':'24',
    'c':'84',
    'd':'86'
}

for(let key in obj){
    let num =obj[key]
    if(num%2==0){
         console.log(num)
    }
}