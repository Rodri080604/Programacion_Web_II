
/*import { clientService } from "../service/client-service.js";

const crear_nueva_fila = (nombre, email, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td class="td" data-td>
            ${nombre}
        </td>
        <td>${email}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_cliente.html?id=${id}"
                        class="simple-button simple-button--edit"
                    >
                        Editar
                    </a>
                </li>
                <li>
                    <button
                        class="simple-button simple-button--delete"
                        type="button"
                        id="${id}"
                    >
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
        clientService.eliminarCliente(id)
            .then(respuesta => {
                if (respuesta.error) {
                    throw new Error(respuesta.error);
                }
                alert("Cliente eliminado correctamente");
                location.reload(); // Recarga la página para actualizar la lista
            })
            .catch(error => alert(`Error al eliminar: ${error.message}`));
    });

    return fila;
};

// ------------ INICIAL -------------
// const table = document.querySelector("[data-table]");
// clientService.listaclientes()
//     .then((data) => {
//         data.forEach((perfil) => {
//             const nuevafila = crear_nueva_fila(perfil.nombre, perfil.email, perfil.id);
//             table.appendChild(nuevafila);
//         });
//     })
//     .catch((error) => alert("error"));

// ------------ MEJORADO -------------
const table = document.querySelector("[data-table]");
clientService
    .listaclientes()
    .then((data) => {
        data.forEach(({ Nombre, Correo, Id }) => {  // <-- CORREGIDO aquí
            const nuevaLinea = crear_nueva_fila(Nombre, Correo, Id); // <-- CORREGIDO aquí
            table.appendChild(nuevaLinea);
        });

        console.log(data); // Verifico los datos
    })
    .catch((error) => alert("Ocurrió un error"));*/


import { v4 as uuidv4 } from 'uuid';
const SUPABASE_URL = 'https://ixjrfiulkogielccnatb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4anJmaXVsa29naWVsY2NuYXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzcwMDYsImV4cCI6MjA2MjQ1MzAwNn0.KPUMwvDbuJ09rWemtgTmSxQWdpgyw6n0Z8FWWv63o_I';
const TABLE = 'perfil';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
};

const listaClientes = () => {
    return fetch(`${API_URL}?select=*`, { headers: HEADERS })
        .then(res => {
            if (!res.ok) throw new Error(`Error en listar clientes: ${res.status}`);
            return res.json();
        });
};

const crearCliente = (nombre, correo) => {
    const perfil = { nombre, correo }; // ID autogenerado por Supabase
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(perfil)
    })
        .then(async (res) => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Error al crear cliente: ${res.status} ${text}`);
            }
            const text = await res.text();
            return text ? JSON.parse(text) : perfil;
        })
        .catch((error) => {
            console.error("Error en crearCliente:", error);
            throw error;
        });
};

const eliminarCliente = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: HEADERS,
    })
        .then(res => {
            if (!res.ok) throw new Error(`Error al eliminar cliente: ${res.status}`);
            return { success: true };
        });
};

const clientes = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, { headers: HEADERS })
        .then(res => {
            if (!res.ok) throw new Error(`Error en obtener cliente: ${res.status}`);
            return res.json().then(data => data[0]);
        })
        .catch(error => {
            console.error("Error en clientes:", error);
            throw error;
        });
};

const actualizarCliente = (nombre, correo, id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ nombre, correo })
    })
        .then(res => {
            if (!res.ok) throw new Error(`Error en actualizar cliente: ${res.status}`);
            return res.json();
        })
        .catch(error => {
            console.error("Error en actualizarCliente:", error);
            throw error;
        });
};

export const clientService = {
    listaClientes,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente
};