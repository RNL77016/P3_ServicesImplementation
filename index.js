const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./routes/rutas');
const app = express();
const port = process.env.PORT || 3000;
const setupSwagger = require('./swagger');
const { logErrors, errorHandler } = require('./middlewares/errorHandler');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
setupSwagger(app);
app.use(logErrors);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hola desde mi server en Express');
});

app.get('/nuevaruta', (req, res) => {
  res.send('Hola desde mi nueva ruta');
});

routerApi(app);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ronisnl:Domelipa321@cluster25712.ga2ds9j.mongodb.net/?retryWrites=true&w=majority&appName=cluster25712';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Conexion a MongoDB exitosa');
    app.listen(port, () => {
      console.log('Mi servidor está funcionando en : ' + port);
    });
  })
  .catch((err) => console.error('No se puede conectar a MongoDB:', err));

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