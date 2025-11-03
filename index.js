const express = require('express');
const routerApi = require('./routes/rutas');
const app = express ();
const port = 3000;
const setupSwagger = require ('./swagger');
const { logErrors, errorHandler} = require ('./middlewares/errorHandler');

app.use(logErrors);
app.use(errorHandler);
setupSwagger(app);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola desde mi server en Express');
});

app.get('/nuevaruta', (req, res) => {
  res.send('Hola desde mi nueva ruta');
});

routerApi(app);

app.listen(port, () => {
  console.log('Mi servidor está funcionando en : ' + port);
});

// app.get('/categories/:categoryId/products/:productId', (req, res) => {
//     const {categoryId, productId} = req.params;
//     res.json({
//         categoryId,
//         productId
//     });
// });

// //Parametros de Query
// app.get('/users', (req, res) => {
//     const { username, lastname} = req.query;
//     if(username && lastname){
//         res.json({
//             username,
//             lastname
//         });
//     } else {
//         res.send('No hay parametros query');
//     }
// });

/*

api.example.com/tasks/{id}/
api.example.com/people/{id}/
api.example.com/users/{id}/tasks/{id}


*/