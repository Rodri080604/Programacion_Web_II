// Initialize Supabase client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ixjrfiulkogielccnatb.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4anJmaXVsa29naWVsY2NuYXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzcwMDYsImV4cCI6MjA2MjQ1MzAwNn0.KPUMwvDbuJ09rWemtgTmSxQWdpgyw6n0Z8FWWv63o_I'; // Replace with your Supabase Anon Key
const supabase = createClient(supabaseUrl, supabaseKey);

// Client service object
const clientService = {
    listaClientes: async () => {
        try {
            const { data, error } = await supabase
                .from('perfil')
                .select('*')
                .order('nombre', { ascending: true });
            if (error) throw new Error(`Error al obtener clientes: ${error.message}`);
            return data;
        } catch (err) {
            console.error("Error en listaClientes:", err);
            throw err;
        }
    },
    crearCliente: async (nombre, correo) => {
        try {
            const { data, error } = await supabase
                .from('perfil')
                .insert([{ nombre, correo }])
                .select();
            if (error) throw new Error(`Error al crear el cliente: ${error.message}`);
            return data[0];
        } catch (err) {
            console.error("Error en crearCliente:", err);
            throw err;
        }
    },
    eliminarCliente: async (id) => {
        try {
            const { error } = await supabase
                .from('perfil')
                .delete()
                .eq('id', id);
            if (error) throw new Error(`Error al eliminar el cliente: ${error.message}`);
            return { success: true };
        } catch (err) {
            console.error("Error en eliminarCliente:", err);
            throw err;
        }
    },
    clientes: async (id) => {
        try {
            const { data, error } = await supabase
                .from('perfil')
                .select('*')
                .eq('id', id)
                .single();
            if (error) throw new Error(`Error al obtener el cliente: ${error.message}`);
            return data;
        } catch (err) {
            console.error("Error en clientes:", err);
            throw err;
        }
    },
    actualizarCliente: async (id, nombre, correo) => {
        try {
            const { data, error } = await supabase
                .from('perfil')
                .update({ nombre, correo })
                .eq('id', id)
                .select();
            if (error) throw new Error(`Error al actualizar el cliente: ${error.message}`);
            return data[0];
        } catch (err) {
            console.error("Error en actualizarCliente:", err);
            throw err;
        }
    }
};

// DOM elements
const clientForm = document.getElementById('clientForm');
const clientsBody = document.getElementById('clientsBody');
const submitBtn = document.getElementById('submitBtn');
const cancelEdit = document.getElementById('cancelEdit');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const clientIdInput = document.getElementById('clientId');

// Load clients on page load
document.addEventListener('DOMContentLoaded', fetchClients);

// Fetch and display clients
async function fetchClients() {
    try {
        const clients = await clientService.listaClientes();
        clientsBody.innerHTML = '';
        clients.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.nombre}</td>
                <td>${client.correo}</td>
                <td>
                    <button class="edit-btn" onclick="editClient(${client.id}, '${client.nombre}', '${client.correo}')">Editar</button>
                    <button class="delete-btn" onclick="deleteClient(${client.id})">Eliminar</button>
                </td>
            `;
            clientsBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching clients:', error);
        alert('Error al cargar los clientes');
    }
}

// Form submission
clientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const clientId = clientIdInput.value;
    const nombre = nameInput.value;
    const correo = emailInput.value;
    try {
        if (clientId) {
            await clientService.actualizarCliente(clientId, nombre, correo);
            alert('Cliente actualizado exitosamente');
        } else {
            await clientService.crearCliente(nombre, correo);
            alert('Cliente registrado exitosamente');
        }
        resetForm();
        fetchClients();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la solicitud');
    }
});

// Edit client
function editClient(id, nombre, correo) {
    clientIdInput.value = id;
    nameInput.value = nombre;
    emailInput.value = correo;
    submitBtn.textContent = 'Actualizar Cliente';
    cancelEdit.style.display = 'inline-block';
}

// Delete client
async function deleteClient(id) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
        try {
            await clientService.eliminarCliente(id);
            alert('Cliente eliminado exitosamente');
            fetchClients();
        } catch (error) {
            console.error('Error deleting client:', error);
            alert('Error al eliminar el cliente');
        }
    }
}

// Reset form
function resetForm() {
    clientForm.reset();
    clientIdInput.value = '';
    submitBtn.textContent = 'Registrar Cliente';
    cancelEdit.style.display = 'none';
}

// Cancel edit
cancelEdit.addEventListener('click', resetForm);