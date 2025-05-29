import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = document.querySelector("[data-nombre]").value;
  const email = document.querySelector("[data-email]").value;

  clientService.crearCliente(nombre, email)
    .then(() => {
      window.location.href = "./lista_cliente.html";
    })
    .catch(error => {
      console.error("Error al registrar cliente:", error);
      alert("Error al registrar cliente");
    });
});