const express = require('express');
const router = express.Router();
const brandsService = require('../services/brandsService');
const service = new brandsService();

// Obtener todas las marcas
router.get('/', (req, res) => {
    const brands = service.getAll();
    res.json(brands);
});

// Obtener marca por id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const brand = service.getById(id);
    res.json(brand);
});

// Crear marca
router.post('/', (req, res) => {
    const body = req.body;
    const newBrand = service.create(body);
    res.status(201).json(newBrand);
});

// Actualizar marca
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const brand = service.update(id, body);
    res.json(brand);
});

// Eliminar marca
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const respuesta = service.delete(id);
    res.json(respuesta);
});

module.exports = router;