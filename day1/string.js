let string=['a','bb','cat','girl','boy','ff','tea']
 function three(string){
     let result=[]
     
     for(let str of string){
         if(str.length==3){
             result.push(str)
         }
     }
     return result;
 }
console.log(three(string))