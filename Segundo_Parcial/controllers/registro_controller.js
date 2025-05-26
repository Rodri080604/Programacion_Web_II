import { clientService } from "../services/client-service.js";
const formulario=document.querySelector("[data-form]")
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;
    const telefono = document.querySelector("[data-telefono]").value;

    clientService.crearCliente(nombre,email,telefono).then((respuesta)=>{
        window.location.href="../screens/registro_completado.html"
    }).catch(error => console.log(error))
});