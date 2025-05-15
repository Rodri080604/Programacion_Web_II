import { clientService } from "../controllers/client_controller.js"; // Asegúrate de que apunte al archivo correcto
const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value.trim();
    const email = document.querySelector("[data-email]").value.trim();

    // Validación
    if (!nombre || !email) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    clientService.crearCliente(nombre, email)
        .then((respuesta) => {
            console.log("Redirigiendo a registro_completado.html");
            window.location.href = '/screens/registro_completado.html';
        })
        .catch(error => {
            console.error("Error al crear cliente:", error);
            alert(`Error al crear cliente: ${error.message}`);
        });
});