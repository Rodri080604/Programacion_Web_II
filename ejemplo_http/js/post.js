const postData=()=>{
    const newPost={                                 //Funcion para crear y luego insertar a la base de datos
        titulo:"Nuevo Post",
        descripcion:"Nueva Descripcion ",
        fecha: new Date().toISOString()             // Convertimos el Date en String
    };


    fetch(API_URL,{
        method:"POST",                               //Todos los metodos en mayuscula
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(newPost)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error(`ERROR EN LA RESPUESTA estado:${response.status}`)
        }
        return response.json();

    }).then(data=>showResult(data))
    .catch(error=>showResult(error.message,true));
};