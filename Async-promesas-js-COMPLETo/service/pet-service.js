const SUPABASE_URL = 'https://uoimvqqiokdfgdxidlfq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvaW12cXFpb2tkZmdkeGlkbGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY5MTQsImV4cCI6MjA2MjQ1MjkxNH0.O4AFj6Swb9m42GNwu634bVUxQwDclMOr2UD9bqfDDXE';
const TABLE = 'pets';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

// Obtener todas las mascotas
const listaPets = () => {
  return fetch(`${API_URL}?select=*`, { headers: HEADERS })
    .then(res => {
      if (!res.ok) throw new Error('Error al listar mascotas');
      return res.json();
    });
};

// Crear nueva mascota
const crearPet = (nombre, especie, edad) => {
  const pet = { nombre, especie, edad: parseInt(edad) };

  return fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(pet)
  }).then(async res => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Error al insertar mascota');
    }

    try {
      return await res.json();
    } catch {
      return pet;
    }
  });
};

const eliminarPet = (id) => {
  return fetch(`${API_URL}?id=eq.${id}`, {
    method: 'DELETE',
    headers: HEADERS
  }).then(res => {
    if (!res.ok) throw new Error('Error al eliminar mascota');
    return res.json();
  });
};

export const petService = {
  listaPets,
  crearPet,
  eliminarPet
};