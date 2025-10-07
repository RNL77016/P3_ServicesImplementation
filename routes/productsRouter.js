const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService');
const service = new productsService();

// Obtener todos los productos
router.get('/', (req, res) => {
    const products = service.getAll();
    res.json(products);
});

// Obtener producto por id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = service.getById(id);
    res.json(product);
});

// Crear producto
router.post('/', (req, res) => {
    const body = req.body;
    const newProduct = service.create(body);
    res.status(201).json(newProduct);
});

// Actualizar producto
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = service.update(id, body);
    res.json(product);
});

// Eliminar producto
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const respuesta = service.delete(id);
    res.json(respuesta);
});

module.exports = router;