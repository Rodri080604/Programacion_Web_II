const API_URL ='http://localhost:3000/posts'        //Este enlace, recuperado del enlace del archivo json
const getData=()=>{                                 //Obtencion de datos
    fetch(API_URL)                                  //Funcion proceso de coneccion de la base de datos
    .then(response=>{                               
        if(!response.ok){                           //Es un verificador
            throw new Error(`error en la peticion get el estado es: ${response.status}`);
        }
        return response.json();
    })
    .then(data => showResult(data))
    .catch(error = showResult(error.message,true));
}