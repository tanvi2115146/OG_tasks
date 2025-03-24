let str=['gg','hghj','fgy','sgdfh','k','hjui']

function evenString(str){
     let result=[]
     
     for(let ele of str){
        if(ele.length % 2 ==0){
            result.push(ele);
    }
  }
   return result;
}
    console.log(evenString(str))