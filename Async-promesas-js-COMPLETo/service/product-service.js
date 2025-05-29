/* const API_URL = 'http://localhost/Async-promesas-js/api/productos.php';

export const productService = {
  listaProductos: () =>
    fetch(API_URL).then(res => res.json()),

  crearProducto: (nombre, precio, descripcion) =>
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: crypto.randomUUID(), nombre, precio, descripcion })
    }).then(res => res.json()),

  eliminarProducto: (id) =>
    fetch(`${API_URL}?id=${id}`, {
      method: "DELETE"
    }).then(res => res.json()),

  editarProducto: (id, nombre, precio, descripcion) =>
    fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nombre, precio, descripcion })
    }).then(res => res.json()),
};
con php apache, y Mysql
*/

const SUPABASE_URL = 'https://uoimvqqiokdfgdxidlfq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvaW12cXFpb2tkZmdkeGlkbGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY5MTQsImV4cCI6MjA2MjQ1MjkxNH0.O4AFj6Swb9m42GNwu634bVUxQwDclMOr2UD9bqfDDXE';

const TABLE = 'productos';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json'
};

const listaProductos = () => {
  return fetch(`${API_URL}?select=*`, {
    headers: HEADERS
  })
  .then(res => {
    if (!res.ok) throw new Error('Error al listar productos');
    return res.json();
  });
};

const crearProducto = (nombre, precio, descripcion) => {
  const producto = { nombre, precio, descripcion };

  return fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(producto)
  })
  .then(async res => {
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Error al insertar producto');
    }
    try {
      return await res.json(); 
    } catch (e) {
      return {};
    }
  });
};

const eliminarProducto = (id) => {
  return fetch(`${API_URL}?id=eq.${id}`, {
    method: 'DELETE',
    headers: HEADERS
  })
  .then(res => {
    if (!res.ok) throw new Error('Error al eliminar producto');
    return res.json();
  });
};

export const productService = {
  listaProductos,
  crearProducto,
  eliminarProducto
};
// 
/*
fetch("http://localhost/api/conexion.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nombre, precio, descripcion })
})
*/