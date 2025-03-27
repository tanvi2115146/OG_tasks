
let url="https://dummyjson.com/products/search?q=phone";
async function fetchData(){
        let res=await fetch(url);
        let data=await res.json();
        console.log(data);
    
}
fetchData().catch((c)=>console.log(err))
    