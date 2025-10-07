const express = require('express');

const router = express.Router();


let movies = [
    {
        id: 1,
        title: 'Tron',
        year: 2010,
        category: 'Sci-Fi'
    },
    {
        id: 2,
        title: 'El renacido',
        year: 2010,
        category: 'Suspenso'
    },
    {
        id: 3,
        title: 'Shrek',
        year: 2003,
        category: 'Animación'
    },
];

//Obtener todo
router.get('/', (req, res) => {
    res.json(movies);
});

//Obtener por id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(m => m.id == id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie Not Found' });
    }
});

//Crear una pelicula
router.post('/', (req, res) => {
    const { title, year, category } = req.body;
    const newMovie = {
        id: movies.length + 1,
        title,
        year,
        category
    };
    movies.push(newMovie);
    res.status(201).json({
        message: 'Created',
        data: newMovie
    });
});

//Actualizar una pelicula
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, year, category } = req.body;
    const movie = movies.find(m => m.id == id);
    if (movie) {
        if (title) movie.title = title;
        if (year) movie.year = year;
        if (category) movie.category = category;
        res.json({
            message: 'Updated',
            data: movie
        });
    } else {
        res.status(404).json({ message: 'Movie Not Found' });
    }
});

//Eliminar una pelicula
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(m => m.id == id);
    if (movieIndex !== -1) {
        movies.splice(movieIndex, 1);
        res.json({ 
            message: 'Deleted',
            id
        });
    } else {
        res.status(404).json({ message: 'Movie Not Found' });
    }
});

module.exports = router;