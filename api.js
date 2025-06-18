export const get=async(endpoint)=>{
    const data= await fetch(`http://localhost:8080/APIproyecto/api/${endpoint}`);
    return await data.json();
}

export const post=async(endpoint,info)=>{
    return await fetch(`http://localhost:8080/APIproyecto/api/${endpoint}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(info)
    })
}

export const put = async (endpoint, info) => {
  try {
    return await fetch(`http://localhost:8080/APIproyecto/api/${endpoint}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(info)
    })
  } catch (error) {
    console.log(error)
  }
}