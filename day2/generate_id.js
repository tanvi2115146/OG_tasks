function generate(n){
    let text="";
    let alpha_list = "abcxsdfghjkloiuyytrewqpm145789630";
    for(let i=0;i<n;i++){
        text+= alpha_list.charAt(Math.floor(Math.random()*alpha_list.length));
    }
    return text;
}
console.log(generate(8));