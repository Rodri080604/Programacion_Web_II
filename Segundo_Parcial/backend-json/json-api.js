import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const JSON_FILE = './clientes.json';

// GET: Obtener todos los clientes
app.get('/api/clientes', async (req, res) => {
    try {
        const data = await fs.readFile(JSON_FILE, 'utf8');
        const clientes = JSON.parse(data);
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer los clientes' });
    }
});

// GET: Obtener un cliente por ID
app.get('/api/clientes/:id', async (req, res) => {
    try {
        const data = await fs.readFile(JSON_FILE, 'utf8');
        const clientes = JSON.parse(data);
        const cliente = clientes.find(c => c.id === req.params.id);
        res.json(cliente || {});
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
});

// POST: Crear un cliente
app.post('/api/clientes', async (req, res) => {
    try {
        const { nombre, email, telefono } = req.body;
        if (!nombre || !email || !telefono) {
            return res.status(400).json({ error: 'Faltan datos: nombre, email o telefono' });
        }
        const data = await fs.readFile(JSON_FILE, 'utf8');
        const clientes = JSON.parse(data);
        const id = String(clientes.length + 1); // Simple ID incremental
        const nuevoCliente = { id, nombre, email, telefono };
        clientes.push(nuevoCliente);
        await fs.writeFile(JSON_FILE, JSON.stringify(clientes, null, 2));
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
});

// PATCH: Actualizar un cliente
app.patch('/api/clientes/:id', async (req, res) => {
    try {
        const { nombre, email, telefono } = req.body;
        if (!nombre || !email || !telefono) {
            return res.status(400).json({ error: 'Faltan datos: nombre, email o telefono' });
        }
        const data = await fs.readFile(JSON_FILE, 'utf8');
        let clientes = JSON.parse(data);
        const index = clientes.findIndex(c => c.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        clientes[index] = { id: req.params.id, nombre, email, telefono };
        await fs.writeFile(JSON_FILE, JSON.stringify(clientes, null, 2));
        res.json(clientes[index]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
});

// DELETE: Eliminar un cliente
app.delete('/api/clientes/:id', async (req, res) => {
    try {
        const data = await fs.readFile(JSON_FILE, 'utf8');
        let clientes = JSON.parse(data);
        const index = clientes.findIndex(c => c.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        clientes = clientes.filter(c => c.id !== req.params.id);
        await fs.writeFile(JSON_FILE, JSON.stringify(clientes, null, 2));
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
});

app.listen(3000, () => console.log('JSON API corriendo en http://localhost:3000'));
