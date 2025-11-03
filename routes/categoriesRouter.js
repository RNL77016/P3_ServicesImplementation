const express = require('express');
const router = express.Router();
const { categoriesService, productsService } = require('../services/instances');
const service = categoriesService;
const products = productsService;

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtener una lista de categorías
 *     responses:
 *       '200':
 *         description: Lista de Categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   categoryName:
 *                     type: string
 *                   description:
 *                     type: string
 *                   active:
 *                     type: boolean
 */
router.get('/', async (req, res) => {
    const categories = await service.getAll();
    res.json(categories);
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtiene una categoría por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 categoryName:
 *                   type: string
 *                 description:
 *                   type: string
 *                 active:
 *                   type: boolean
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await service.getById(id);
        res.json(category);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crea una nueva categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                 categoryName:
 *                   type: string
 *                 description:
 *                   type: string
 *                 active:
 *                   type: boolean
 *     responses:
 *       '201':
 *         description: Categoría Creada
 */
router.post('/', async (req, res) => {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
});

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Actualiza una categoría por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 categoryName:
 *                   type: string
 *                 description:
 *                   type: string
 *                 active:
 *                   type: boolean
 *     responses:
 *       '200':
 *         description: Categoría actualizada
 */
router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body);
    res.json(category);
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Elimina una categoría por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Categoría eliminada
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const allProducts = await products.getAll();
        const inUse = allProducts.some(p => p.categoryId == id);
        if (inUse) return res.status(400).json({ message: 'Cannot delete category: there are products referencing it' });
        const respuesta = await service.delete(id);
        res.json(respuesta);
    } catch (error) {
        next(error);
    }
});

module.exports = router;