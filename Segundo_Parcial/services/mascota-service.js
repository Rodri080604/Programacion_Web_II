// LLAMADAS DE CONEXION A SUPABASE
const SUPABASE_URL = 'https://lyhjeuaiqlhrclifjfyc.supabase.co'; // URL de Supabase
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aGpldWFpcWxocmNsaWZqZnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMTQ5MjEsImV4cCI6MjA2Mjg5MDkyMX0.ZiXgPirdeV613Fhn2MYOitbDy9wAcF8jknniZcGfD70'
const TABLE = 'mascotas'; // Nombre de la tabla en Supabase

// /rest/v1/ es la ruta para acceder a la API REST de Supabase (por defectp)
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`; // Me indica la tabla a la que me voy a conectar

// Headers necesarios para la autenticación y el formato de los datos
const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
}; 

// LLAMADA DEL REST: Funciones de llamado a la API de Supabase
const listaMascotas = () => {
    // Updated to fetch the client's name using Supabase's foreign key embedding.
    // Assumes 'duenho' in 'mascotas' table is the foreign key to 'clientes' table.
    // And Supabase can resolve 'clientes:duenho(nombre)' to get cliente.nombre.
    return fetch(`${API_URL}?select=id,nombre,duenho,clientes:duenho(nombre)`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error al obtener la lista de mascotas');
        }
        return res.json();
    });
};

// Get all clients for populating dropdowns
const listaClientes = () => {
    return fetch(`${SUPABASE_URL}/rest/v1/clientes?select=id,nombre,email`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error al obtener la lista de clientes');
        }
        return res.json();
    });
};

const crearMascotas = (nombre, duenho) => {
    // Ensure duenho is treated as a client ID (foreign key)
    const mascota = {
        nombre,
        duenho, // This should be the client's ID, not the name
        id: uuid.v4()
    };
    
    console.log("Creando mascota con:", JSON.stringify(mascota));
    
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(mascota)
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            console.error("Error response:", text);
            
            // Check for foreign key violation
            if (text.includes("violates foreign key constraint") || text.includes("fk_constraint")) {
                throw new Error("El ID del dueño no existe en la tabla de clientes");
            }
            
            throw new Error(text || 'Error al crear la mascota');
        }
        const text = await res.text();
        return text ? JSON.parse(text) : mascota;
    })
    .catch((error) => {
        console.error('Error en la creación de la mascota:', error);
        throw error;
    });
};

const eliminarMascotas = (id) => { // valor de entrada de referencia del elemento a eliminar
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al eliminar el mascota');
        }
        
        const text = await res.text();
        return text ? JSON.parse(text) : { id }; // Devuelve la respuesta o al menos el id eliminado
    })
    .catch((error) => {
        console.error('Error al eliminar el mascota:', error);
        throw error;
    });
};

const mascotas = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        headers: HEADERS
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al obtener el mascota');
        }
        const text = await res.text();
        return text ? JSON.parse(text) : null; // Devuelve los datos o null si no hay contenido
    })
    .catch((error) => {
        console.error('Error al consultar el mascota:', error);
        throw error;
    });
};

const actualizarMascotas = (nombre, duenho, id) => {
    // Ensure duenho is treated as a client ID (foreign key)
    console.log("Actualizando mascota con ID:", id, "Nombre:", nombre, "Dueño ID:", duenho);
    
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ nombre, duenho }) // duenho should be the client's ID
    })
    .then(async (res) => {
        if (!res.ok) {
            const error = await res.text();
            console.error("Error response:", error);
            
            // Check for foreign key violation
            if (error.includes("violates foreign key constraint") || error.includes("fk_constraint")) {
                throw new Error("El ID del dueño no existe en la tabla de clientes");
            }
            
            throw new Error(error || 'Error al actualizar la mascota');
        }
        const data = await res.json();
        return data[0];
    })
    .catch((error) => {
        console.error('Error en la actualización de la mascota:', error);
        throw error;
    });
};

export const mascotaService = {
    listaMascotas,
    crearMascotas,
    eliminarMascotas,
    mascotas,
    actualizarMascotas,
    listaClientes // Add this to the exported service
};