/*
//Crea una nueva fila en la tabla de clientes y recibe el nombre y el email
const crear_nueva_fila = (nombre,email) =>{
    const fila = document.createElement('tr');//crea una nueva fila en la tabla

    //Guardo el HTML en una variable y también llamo a mis datos de entrada
    const contenido = `
            <td class="td" data-td>${nombre}</td>
            <td>${email}</td>
            <td>
                <ul class="table__button-control">
                <li>
                    <a
                    href="../screens/editar_cliente.html"
                    class="simple-button simple-button--edit"
                    >Editar</a
                    >
                </li>
                <li>
                    <button
                    class="simple-button simple-button--delete"
                    type="button"
                    >
                    Eliminar
                    </button>
                </li>
                </ul>
            </td>`;
        fila.innerHTML = contenido;
        return fila;
}
const tabla = document.querySelector("[data-table]");
*/


/*
//METODO ANTIGUO PARA HACER UNA PETICION 
const listar_clientes=()=>{
    const promesa = new Promise((resolve,reject)=>{
        const http = new XMLHttpRequest(); //variable con request y xml
        http.open("GET","http://localhost:3000/perfil");
        http.send();
        http.onload = ()=>{
            const response = JSON.parse(http.response);//convierte la respuesta http sea json
            if(http.response>= 400){
                reject(response);
            }else{
                resolve(response);
            }
        };
    });
    return promesa;
};*/ 







const listaclientes=()=>
    fetch("http://localhost:3000/perfil").then((response)=> response.json())






/*
listar_clientes()
    .then((data)=>{
        data.forEach((perfil)=>{
            const nueva_fila = crear_nueva_fila(perfil.nombre,perfil.email);
            tabla.appendChild(nueva_fila);
        });
    })
    .catch((error)=> alert("No existe conexión"));
*/




const crearCliente=(nombre,email)=>{
    return fetch("http://localhost:3000/perfil",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({nombre,email, id: uuid.v4()}),
    });
};
const eliminarCliente=(id)=>{
    return fetch(`http://localhost:3000/perfil/${id}`,{
        method:"DELETE",
    });
}; 
//REFERENCIA A UN CLIENTE EN ESPECIFICO
const clientes=(id)=>{
    return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta)=> respuesta.json())
}

const actualizarCliente=(nombre,email,id)=>{
    return fetch(`http://localhost:3000/perfil/${id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
        body:JSON.stringify({nombre,email}),
    }).then(respuesta =>console.log(respuesta)).catch((error) => console.log(error));
}

export const clientService={
    listaclientes,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente
}; 