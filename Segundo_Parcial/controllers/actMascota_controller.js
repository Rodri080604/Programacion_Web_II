import { mascotaService } from "../services/mascota-service.js";
import { clientService } from "../services/client-service.js";

const formulario = document.querySelector("[data-form]");
const nombreInput = document.querySelector("[data-nombre]");
const duenhoSelect = document.querySelector("[data-duenho]");
const idInput = document.querySelector("[data-id]");

// Populate client dropdown
const loadClientes = async () => {
    try {
        const clientes = await clientService.listaclientes();
        
        // First, clear any existing options except the first placeholder
        while (duenhoSelect.options.length > 0) {
            duenhoSelect.remove(0);
        }
        
        // Add a placeholder option
        const placeholderOption = document.createElement('option');
        placeholderOption.value = "";
        placeholderOption.textContent = "Seleccione un dueño";
        placeholderOption.disabled = true;
        duenhoSelect.appendChild(placeholderOption);
        
        // Add client options
        clientes.forEach((cliente) => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} (${cliente.id})`;
            duenhoSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading clients:", error);
        alert("Error al cargar la lista de clientes");
    }
};

// Load pet data
const loadMascotaData = async () => {
    try {
        const url = new URL(window.location);
        const id = url.searchParams.get("id");
        
        if (!id) {
            throw new Error("ID de mascota no encontrado");
        }
        
        idInput.value = id;
        
        const mascota = await mascotaService.mascotas(id);
        if (mascota && mascota.length > 0) {
            const petData = mascota[0];
            nombreInput.value = petData.nombre;
            
            // Wait for client dropdown to be populated
            await loadClientes();
            
            // Select the correct client
            if (petData.duenho) {
                for (let i = 0; i < duenhoSelect.options.length; i++) {
                    if (duenhoSelect.options[i].value === petData.duenho) {
                        duenhoSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        } else {
            throw new Error("No se encontró la mascota");
        }
    } catch (error) {
        console.error("Error loading pet data:", error);
        alert("Error al cargar los datos de la mascota");
        window.location.href = "../screens/lista_mascota.html";
    }
};

// Initialize the page
loadMascotaData();

// Handle form submission
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    try {
        const id = idInput.value;
        const nombre = nombreInput.value;
        const duenho = duenhoSelect.value;
        
        if (!nombre || !duenho) {
            alert("Por favor complete todos los campos");
            return;
        }
        
        await mascotaService.actualizarMascotas(nombre, duenho, id);
        window.location.href = "../screens/lista_mascota.html";
    } catch (error) {
        console.error("Error updating pet:", error);
        alert("Error al actualizar la mascota: " + error.message);
    }
});