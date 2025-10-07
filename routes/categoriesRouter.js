const express = require('express');
const router = express.Router();
const categoriesService = require('../services/categoriesService');
const service = new categoriesService();

// Obtener todas las categorías
router.get('/', (req, res) => {
    const categories = service.getAll();
    res.json(categories);
});

// Obtener categoría por id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const category = service.getById(id);
    res.json(category);
});

// Crear categoría
router.post('/', (req, res) => {
    const body = req.body;
    const newCategory = service.create(body);
    res.status(201).json(newCategory);
});

// Actualizar categoría
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const category = service.update(id, body);
    res.json(category);
});

// Eliminar categoría
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const respuesta = service.delete(id);
    res.json(respuesta);
});

module.exports = router;