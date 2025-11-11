const express = require('express');
const router = express.Router();
const { brandsService, productsService } = require('../services/instances');
const service = brandsService;
const products = productsService;

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Obtener todas las marcas
 *     tags:
 *       - brands
 *     responses:
 *       '200':
 *         description: Lista de marcas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   brandName:
 *                     type: string
 *                   active:
 *                     type: boolean
 */
router.get('/', async (req, res) => {
    const brands = await service.getAll();
    res.json(brands);
});

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Obtener una marca por id
 *     tags:
 *       - brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Marca encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 brandName:
 *                   type: string
 *                 active:
 *                   type: boolean
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const brand = await service.getById(id);
        res.json(brand);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Crea una nueva marca
 *     tags:
 *       - brands
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Marca creada
 */
router.post('/', async (req, res) => {
    const body = req.body;
    const newBrand = await service.create(body);
    res.status(201).json(newBrand);
});

/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: Actualiza una marca por id
 *     tags:
 *       - brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Marca actualizada
 */
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const brand = await service.update(id, body);
    res.json(brand);
});

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Elimina una marca por id
 *     tags:
 *       - brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Marca eliminada
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const allProducts = await products.getAll();
        const inUse = allProducts.some(p => p.brandId == id);
        if (inUse) return res.status(400).json({ message: 'No se puede eliminar la marca: hay productos que la referencian' });
        const respuesta = await service.delete(id);
        res.json(respuesta);
    } catch (error) {
        next(error);
    }
});

module.exports = router;