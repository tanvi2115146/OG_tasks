//TYPES OF ERROR:
// EVAL ERROR , RANGE ERROR, TYPE ERROR, SYNTAX ERROR, REFRENCE ERROR, URI ERROR


//PRIME NUMBER
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
console.log(prime(37));