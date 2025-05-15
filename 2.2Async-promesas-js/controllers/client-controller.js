import {clientService} from '../service/client-service.js'; 



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
                    href="../screens/editar_cliente.html?.id=${id}"
                    class="simple-button simple-button--edit"
                    >Editar</a
                    >
                </li>
                <li>
                    <button
                    class="simple-button simple-button--delete"
                    type="button" id="${id}">
                    Eliminar
                    </button>
                </li>
                </ul>
            </td>`;
        fila.innerHTML = contenido;


        const btn = fila.querySelector("button"); //busca el boton eliminar
        btn.addEventListener('click',()=>{
            const id = btn.id;
            clientService.eliminarCliente(id).then((respuesta)=>{
                alert("Eliminado ");
                fila.remove();
            }).catch(error => alert("Error"));
        })


        return fila;
}
const tabla = document.querySelector("[data-table]");
//CREAMOS EL NUEVO ELEMENTO EN LA TABLA
clientService.listaclientes().then((data)=>{
    data.forEach(perfil => {
        const nuevaFila = crear_nueva_fila(perfil.nombre,perfil.email,perfil.id);
        tabla.appendChild(nuevaFila);
    });
}).catch((error)=> alert("Errores en el servidor"));