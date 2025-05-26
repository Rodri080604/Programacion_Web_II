// LLAMADAS DE CONEXION A SUPABASE
const SUPABASE_URL = 'https://lyhjeuaiqlhrclifjfyc.supabase.co'; // URL de Supabase
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aGpldWFpcWxocmNsaWZqZnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMTQ5MjEsImV4cCI6MjA2Mjg5MDkyMX0.ZiXgPirdeV613Fhn2MYOitbDy9wAcF8jknniZcGfD70'
const TABLE = 'productos'; // Nombre de la tabla en Supabase

// /rest/v1/ es la ruta para acceder a la API REST de Supabase (por defectp)
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`; // Me indica la tabla a la que me voy a conectar

// Headers necesarios para la autenticación y el formato de los datos
const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
}; 

// LLAMADA DEL REST: Funciones de llamado a la API de Supabase
const listaProductos = () => {
    return fetch(`${API_URL}?select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error al obtener la lista de productos');
        }
        return res.json();
    });
};

const crearProducto = (nombre, precio) => {
    const producto = {
        nombre,
        precio,
        id: uuid.v4() // Genera un ID único para el nuevo cliente
    };
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(producto)
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al crear el producto');
        }
        const text = await res.text();
        return text ? JSON.parse(text) : producto; // Devuelve el cliente creado o el objeto vacío
    })
    .catch((error) => {
        console.error('Error en la creación del producto:', error);
        throw error;
    });
};

const eliminarProducto = (id) => { // valor de entrada de referencia del elemento a eliminar
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al eliminar el producto');
        }
        
        const text = await res.text();
        return text ? JSON.parse(text) : { id }; // Devuelve la respuesta o al menos el id eliminado
    })
    .catch((error) => {
        console.error('Error al eliminar el producto:', error);
        throw error;
    });
};

const productos = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        headers: HEADERS
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al obtener el producto');
        }
        const text = await res.text();
        return text ? JSON.parse(text) : null; // Devuelve los datos o null si no hay contenido
    })
    .catch((error) => {
        console.error('Error al consultar el producto:', error);
        throw error;
    });
};

const actualizarProducto = (nombre, precio, id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH', // reemplazo de PUT
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation' // Preferencia para obtener la representación del cliente actualizado
        },
        body: JSON.stringify({ nombre, precio })
    })
    .then(async (res) => {
        if (!res.ok) {
            const error = await res.text();
            throw new Error(error || 'Error al actualizar el producto');
        }
        const data = await res.json();
        return data[0]; // Devuelve el cliente actualizado
    })
    .catch((error) => {
        console.error('Error en la actualización del producto:', error);
        throw error;
    });
};

export const productoService={
    listaProductos,
    crearProducto,
    eliminarProducto,
    productos,
    actualizarProducto
};