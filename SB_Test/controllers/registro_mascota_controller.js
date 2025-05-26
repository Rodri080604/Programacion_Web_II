import { mascotaService } from "../services/mascota-service.js";

const formulario = document.querySelector("[data-form]");
const duenhoSelect = document.querySelector("[data-duenho]");

// Function to populate the client dropdown
const populateClientDropdown = async () => {
    try {
        console.log("Fetching clients for dropdown...");
        const clientes = await mascotaService.listaClientes();
        console.log("Clients received:", clientes);
        
        // Clear existing options first
        duenhoSelect.innerHTML = '';
        
        // Add placeholder option
        const placeholderOption = document.createElement('option');
        placeholderOption.value = "";
        placeholderOption.textContent = "Seleccione un dueño";
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        duenhoSelect.appendChild(placeholderOption);
        
        // Add client options
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} (ID: ${cliente.id})`;
            duenhoSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading clients:", error);
        alert("Error al cargar la lista de clientes: " + error.message);
    }
};

// Load clients when page loads
document.addEventListener('DOMContentLoaded', () => {
    populateClientDropdown();
});

// Handle form submission
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    const nombre = document.querySelector("[data-nombre]").value;
    const duenho = duenhoSelect.value;
    
    if (!nombre || !duenho) {
        alert("Por favor complete todos los campos");
        return;
    }
    
    console.log("Creating mascota with name:", nombre, "and owner ID:", duenho);
    
    mascotaService.crearMascotas(nombre, duenho)
        .then(response => {
            console.log("Mascota created:", response);
            alert(`Mascota ${nombre} registrada con éxito`);
            window.location.href = "lista_mascota.html";
        })
        .catch(error => {
            console.error("Error creating mascota:", error);
            alert("Error al crear la mascota: " + error.message);
        });
});
