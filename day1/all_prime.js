function isprime(n){
    if(n<2){
        return false;
    }
    for(let i=2;i<n;i++){
        if(n%i==0){
            return false;
        }
    }
    return true;
}

function allPrime(num){
    let prime=[]
    for(let i=2;i<=num;i++){
        if(isprime(i)){
            prime.push(i)
        }
    }
    return prime;
}

let input = parseInt(prompt("enter the numbers from which you want to find primes: "));
console.log(allPrime(input));