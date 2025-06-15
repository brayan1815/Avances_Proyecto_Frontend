export const get=async(endpoint)=>{
    const data= await fetch(`http://localhost:8080/APIproyecto/api/${endpoint}`);
    return await data.json();
}