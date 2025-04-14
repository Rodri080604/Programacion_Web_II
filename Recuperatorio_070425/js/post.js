import Form from "../Componentes/formulario";
import tabla from "../Componentes/tabla";
import cards from "../Componentes/Cards";
const API_URL = 'http://localhost:3000/posts';

// Mostrar resultados (ya definido en tu HTML, pero lo movemos aquí para consistencia)
const showResult = (data, isError = false) => {
    const statusEl = document.getElementById('status');
    const resultEl = document.getElementById('result');
    if (isError) {
        statusEl.innerHTML = '<div class="status status-error">Error en la operación</div>';
        resultEl.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    } else {
        statusEl.innerHTML = '<div class="status status-success">Operación exitosa</div>';
        resultEl.textContent = JSON.stringify(data, null, 2);
    }
};

// Guardar en localStorage
const saveToLocalStorage = (datos) => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        id: Math.random().toString(36).substr(2, 4), // ID automático
        task: datos.task,
        description: datos.description,
        date: datos.date,
        prioridad: datos.prioridad,
        nombre: datos.nombre,
        valorEntero: datos.valorEntero,
    };
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    return newPost;
};

// Cargar datos iniciales de localStorage
const loadFromLocalStorage = () => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach((post) => tabla.addTask(post));
};

// POST: Crear un nuevo elemento
const postData = (datos) => {
    const newPost = saveToLocalStorage(datos);
    tabla.addTask(newPost);

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            titulo: newPost.task,
            descripcion: newPost.description,
            fecha: newPost.date,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`ERROR EN LA RESPUESTA estado: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => showResult(data))
        .catch((error) => showResult(error.message, true));
};

// GET: Obtener datos
const getData = () => {
    fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error en la petición GET, estado: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            showResult(data);
            data.forEach((post) => tabla.addTask({
                id: post.id,
                task: post.titulo,
                description: post.descripcion,
                date: post.fecha,
                prioridad: 'N/A',
                nombre: 'N/A',
                valorEntero: '0',
            }));
        })
        .catch((error) => showResult(error.message, true));
};

// PUT: Actualizar un elemento
const putData = () => {
    const update = {
        titulo: 'Actualizado',
        descripcion: 'actualizado',
        fecha: new Date().toISOString(),
    };
    fetch(`${API_URL}/1`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(update),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`ERROR EN LA RESPUESTA estado: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => showResult(data))
        .catch((error) => showResult(error.message, true));
};

// DELETE: Eliminar un elemento
const deleteData = () => {
    fetch(`${API_URL}/1`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`ERROR EN LA RESPUESTA estado: ${response.status}`);
            }
            showResult({ message: 'El post con id 1 fue eliminado', status: response.status });
        })
        .catch((error) => showResult(error.message, true));
};

// Conectar eventos a los botones
document.querySelector('.btn-get').addEventListener('click', getData);
document.querySelector('.btn-put').addEventListener('click', putData);
document.querySelector('.btn-delete').addEventListener('click', deleteData);

// Conectar el formulario a postData
Form.setDatos(postData);

// Cargar datos al iniciar
window.onload = () => loadFromLocalStorage();