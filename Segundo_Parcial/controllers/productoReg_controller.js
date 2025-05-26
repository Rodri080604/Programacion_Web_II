import { productoService } from "../services/producto-service.js";
const formulario=document.querySelector("[data-form]")
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;

    productoService.crearProducto(nombre,precio).then((respuesta)=>{
        window.location.href="../screens/registro_completado.html"
    }).catch(error => console.log(error))
});