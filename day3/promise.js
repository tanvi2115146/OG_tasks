
let url="https://dummyjson.com/products/search?q=phone";
async function fetchData(){
    try{
        let res=await fetch(url);
        let data=await res.json();
        console.log(data);
    }
    catch(e){
        console.log("error:" , e)
    }
}
fetchData();