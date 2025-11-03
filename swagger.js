//swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Configuración de Swagger 
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Documentación de la API', //Titulo de la documentación
        version: '1.0.0', //Versión de la API
        description: 'Documentación de la API con Swagger',
    },
    servers: [
        {
            url: 'http://localhost:3000', //URL base de la API
            description: 'Servidor de desarrollo',
        }
    ]
};

const options = {
    swaggerDefinition,
    //Paths to files to be documented
    apis: ['./routes/*.js'], //Ajustamos esto en la ruta de los archivos
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;