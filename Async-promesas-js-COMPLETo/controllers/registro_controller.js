/*import { clientService } from "../controllers/client_controller.js"; // Asegúrate de que apunte al archivo correcto
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
*/



const API_BASE_URL = 'http://'; // Adjust to your PHP API URL

// Obtener lista de clientes
const listaClientes = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error(`Error al obtener perfiles: ${response.status}`);
            return response.json();
        })
        .catch(err => {
            console.error("Error en listaClientes:", err);
            throw err;
        });
};

// Crear un nuevo cliente
const crearCliente = (nombre, correo) => {
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, correo })
    })
        .then(response => {
            if (!response.ok) throw new Error(`Error al crear el cliente: ${response.status}`);
            return response.json();
        })
        .catch(err => {
            console.error("Error en crearCliente:", err);
            throw err;
        });
};

// Eliminar cliente
const eliminarCliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) throw new Error(`Error al eliminar el cliente: ${response.status}`);
            return response.json();
        })
        .catch(err => {
            console.error("Error en eliminarCliente:", err);
            throw err;
        });
};

// Obtener un cliente por ID
const clientes = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);
            return response.json();
        })
        .catch(err => {
            console.error("Error en clientes:", err);
            throw err;
        });
};

// Actualizar cliente
const actualizarCliente = (nombre, correo, id) => {
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, nombre, correo })
    })
        .then(response => {
            if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);
            return response.json();
        })
        .catch(err => {
            console.error("Error en actualizarCliente:", err);
            throw err;
        });
};

// Exportar funciones
export const clientService = {
    listaClientes,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente
};






