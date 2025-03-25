let obj={
    'a':'11',
    'b':'24',
    'c':'1',
    'd':'7'
}

function prime(n){
    if(n<2){
        return false;
    }
    if(n>=2){
        for(i=2;i<n;i++){
            if(n%i==0){
                return false;
            }
        }
        return true;
    }
}

for(let key in obj){
   if(prime(obj[key])){
        console.log(obj[key])
   }
}