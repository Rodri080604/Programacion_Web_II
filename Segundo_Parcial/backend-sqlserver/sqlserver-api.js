// Segundo Parcial - API RESTful con JSON
import express from 'express';
import sql from 'mssql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const config = {
    user: 'tu_usuario', // Reemplaza con tu usuario de SQL Server
    password: 'tu_contraseña', // Reemplaza con tu contraseña
    server: 'localhost', // Reemplaza con el nombre del servidor
    database: 'doguito',
    options: {
        encrypt: true,
        trustServerCertificate: true // Para conexiones locales
    }
};

// GET: Obtener todos los clientes
app.get('/api/clientes', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM clientes');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes: ' + error.message });
    }
});

// GET: Obtener un cliente por ID
app.get('/api/clientes/:id', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.NVarChar, req.params.id)
            .query('SELECT * FROM clientes WHERE id = @id');
        res.json(result.recordset[0] || {});
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente: ' + error.message });
    }
});

// POST: Crear un cliente
app.post('/api/clientes', async (req, res) => {
    try {
        const { nombre, email, telefono } = req.body;
        if (!nombre || !email || !telefono) {
            return res.status(400).json({ error: 'Faltan datos: nombre, email o telefono' });
        }
        const id = require('uuid').v4(); // Generar UUID
        let pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.NVarChar, id)
            .input('nombre', sql.NVarChar, nombre)
            .input('email', sql.NVarChar, email)
            .input('telefono', sql.NVarChar, telefono)
            .query('INSERT INTO clientes (id, nombre, email, telefono) VALUES (@id, @nombre, @email, @telefono)');
        res.status(201).json({ id, nombre, email, telefono });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el cliente: ' + error.message });
    }
});

// PATCH: Actualizar un cliente
app.patch('/api/clientes/:id', async (req, res) => {
    try {
        const { nombre, email, telefono } = req.body;
        if (!nombre || !email || !telefono) {
            return res.status(400).json({ error: 'Faltan datos: nombre, email o telefono' });
        }
        let pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.NVarChar, req.params.id)
            .input('nombre', sql.NVarChar, nombre)
            .input('email', sql.NVarChar, email)
            .input('telefono', sql.NVarChar, telefono)
            .query('UPDATE clientes SET nombre = @nombre, email = @email, telefono = @telefono WHERE id = @id');
        res.json({ id: req.params.id, nombre, email, telefono });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente: ' + error.message });
    }
});

// DELETE: Eliminar un cliente
app.delete('/api/clientes/:id', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.NVarChar, req.params.id)
            .query('DELETE FROM clientes WHERE id = @id');
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente: ' + error.message });
    }
});

app.listen(3001, () => console.log('SQL Server API corriendo en http://localhost:3001'));
