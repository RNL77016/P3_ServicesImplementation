const express = require('express');
const router = express.Router();
const { usersService } = require('../services/instances');
const service = usersService;

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener una lista de usuarios
 *     tags:
 *       - users
 *     responses:
 *       '200':
 *         description: Lista de Usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   username:
 *                     type: string
 *                   password:
 *                     type: string
 */
router.get('/', async (req, res) => {
    const users = await service.getAll();
    res.json(users);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await service.getById(id);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                 name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Usuario Creado
 */
router.post('/', async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualiza un usuario por ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Usuario actualizado
 */
router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);
    res.json(user);
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario eliminado
 */
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.json(respuesta);
});

module.exports = router;

