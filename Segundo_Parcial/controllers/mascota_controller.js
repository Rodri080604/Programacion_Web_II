import {mascotaService} from "../services/mascota-service.js";
import { clientService } from "../services/client-service.js";

// Function to handle pet creation
const formulario = document.querySelector("[data-form]");
if (formulario) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const nombre = document.querySelector("[data-nombre]").value;
        const duenho = document.querySelector("[data-duenho]").value;
        
        // Validate input
        if (!nombre || !duenho) {
            alert("Por favor complete todos los campos");
            return;
        }
        
        mascotaService.crearMascotas(nombre, duenho)
            .then(() => {
                window.location.href = "../screens/lista_mascota.html";
            })
            .catch(error => {
                console.error("Error al crear mascota:", error);
                alert("Error al crear la mascota: " + error.message);
            });
    });
}

// Function to create a new row in the table with pet and owner information
const crear_nueva_fila = (mascota) => {
    const fila = document.createElement('tr');
    
    // Get the owner name from the joined data
    const duenhoNombre = mascota.clientes ? mascota.clientes.nombre : 'Dueño no encontrado';
    
    const contenido = `
        <td class="td" data-td>${mascota.nombre}</td>
        <td>${duenhoNombre}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_mascota.html?id=${mascota.id}" 
                       class="simple-button simple-button--edit">
                        Editar
                    </a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" 
                            type="button" id="${mascota.id}">
                        Eliminar
                    </button>
                </li>
            </ul>
        </td>
    `;
    
    fila.innerHTML = contenido;
    const btn = fila.querySelector("button");
    
    btn.addEventListener("click", () => {
        const id = btn.id;
        mascotaService.eliminarMascotas(id)
            .then(() => {
                alert("Mascota eliminada");
                fila.remove(); // Remove the row without reloading the page
            })
            .catch(error => {
                console.error("Error al eliminar:", error);
                alert("Error al eliminar la mascota");
            });
    });

    return fila;
};

// Populate the pet table
const table = document.querySelector("[data-tabla]");
if (table) {
    console.log("Loading pet list...");
    mascotaService.listaMascotas()
        .then((data) => {
            console.log("Pets received:", data);
            table.innerHTML = ''; // Clear existing rows
            
            data.forEach((mascota) => {
                const nuevaLinea = crear_nueva_fila(mascota);
                table.appendChild(nuevaLinea);
            });
        })
        .catch((error) => {
            console.error("Error loading pets:", error);
            alert("Error al cargar las mascotas: " + error.message);
        });
}

// Populate client dropdown if we're on the registration or edit page
const clienteDropdown = document.querySelector("[data-duenho]");
if (clienteDropdown) {
    // First, clear any existing options except the first placeholder
    while (clienteDropdown.options.length > 0) {
        clienteDropdown.remove(0);
    }
    
    // Add a placeholder option
    const placeholderOption = document.createElement('option');
    placeholderOption.value = "";
    placeholderOption.textContent = "Seleccione un dueño";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    clienteDropdown.appendChild(placeholderOption);
    
    // Fetch and populate client list
    clientService.listaclientes()
        .then((clientes) => {
            clientes.forEach((cliente) => {
                const option = document.createElement('option');
                option.value = cliente.id;
                option.textContent = `${cliente.nombre} (${cliente.id})`;
                clienteDropdown.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error al cargar clientes:", error);
            const errorOption = document.createElement('option');
            errorOption.textContent = "Error al cargar clientes";
            clienteDropdown.appendChild(errorOption);
        });
}