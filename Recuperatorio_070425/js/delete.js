const deleteData=()=>{
    fetch(`${API_URL}/1`,{
        method:"DELETE"
    }).then(response =>{
        if(!response.ok){
            throw new Error(`ERROR EN LA RESPUESTA estado:${response.status}`)
        }
        return response.json();

    showResult({
        message:"el post con id 1 fue elimando",
        status:response.status
    });
}).catch(error => showResult(error.message))
}