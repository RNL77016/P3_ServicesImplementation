const express = require('express');
const router = express.Router();
const { productsService, categoriesService, brandsService } = require('../services/instances');
const service = productsService;
const categories = categoriesService;
const brands = brandsService;

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener una lista de productos
 *     tags:
 *       - products
 *     responses:
 *       '200':
 *         description: Lista de Productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   image: 
 *                     type: string
 *                   produdtName:
 *                     type: string
 *                   description:
 *                     type: string 
 *                   price:
 *                     type: number
 *                   stock:
 *                     type: number
 *                   categoryId:
 *                     type: string 
 *                   brandId:
 *                     type: string
 */
router.get('/', async (req, res) => {
    const products = await service.getAll();
    res.json(products);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags:
 *       - products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 image: 
 *                   type: string
 *                 produdtName:
 *                   type: string
 *                 description:
 *                   type: string 
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: number
 *                 categoryId:
 *                   type: string
 *                 brandId:
 *                   type: string
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.getById(id);
        res.json(product);
    } catch (error) {
        next(error); // Si ocurre un error, pasa el error al middleware manejador de errores
    }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags:
 *       - products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                 image: 
 *                   type: string
 *                 produdtName:
 *                   type: string
 *                 description:
 *                   type: string 
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: number
 *                 categoryId:
 *                   type: string
 *                 brandId:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Producto Creado
 */
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        // Validar que categoryId y brandId existan
        if (body.categoryId) {
            const cat = await categories.getById(body.categoryId);
            if (!cat) return res.status(400).json({ message: 'Category no encontrada' });
        }
        if (body.brandId) {
            const br = await brands.getById(body.brandId);
            if (!br) return res.status(400).json({ message: 'Brand no encontrada' });
        }
        const newProduct = await service.create(body);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualiza un producto por ID
 *     tags:
 *       - products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 image: 
 *                   type: string
 *                 produdtName:
 *                   type: string
 *                 description:
 *                   type: string 
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: number
 *                 categoryId:
 *                   type: string
 *                 brandId:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Producto actualizado
 */
router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        // Si se actualiza categoryId o brandId, validar existencia
        if (body.categoryId) {
            const cat = await categories.getById(body.categoryId);
            if (!cat) return res.status(400).json({ message: 'Category no encontrada' });
        }
        if (body.brandId) {
            const br = await brands.getById(body.brandId);
            if (!br) return res.status(400).json({ message: 'Brand no encontrada' });
        }
        const product = await service.update(id, body);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags:
 *       - products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Producto eliminado
 */
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.json(respuesta);
});

module.exports = router;