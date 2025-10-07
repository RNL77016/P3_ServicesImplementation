const express = require('express');
const router = express.Router();
const usersService = require('../services/usersService');
const service = new usersService();

// Obtener todos los usuarios
router.get('/', (req, res) => {
    const users = service.getAll();
    res.json(users);
});

// Obtener usuario por id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = service.getById(id);
    res.json(user);
});

// Crear usuario
router.post('/', (req, res) => {
    const body = req.body;
    const newUser = service.create(body);
    res.status(201).json(newUser);
});

// Actualizar usuario
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const user = service.update(id, body);
    res.json(user);
});

// Eliminar usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const respuesta = service.delete(id);
    res.json(respuesta);
});

module.exports = router;

