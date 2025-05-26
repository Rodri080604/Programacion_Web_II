import { mascotaService } from "../service/mascota-service.js";
const formulario=document.querySelector("[data-form]")
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const duenho = document.querySelector("[data-duenho]").value;

    mascotaService.crearMascota(nombre, duenho).then((respuesta)=>{
        window.location.href="/SB_Test/screens/regMascotaCompletado.html"
    }).catch(error => console.log(error))
});