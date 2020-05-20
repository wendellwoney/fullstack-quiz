const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        info:{
            title: 'QUIZ',
            description: 'Project question and answer enem',
            version: '1.0.0',
            swagger: "2.0",
        },
        basePath: '/'
    },
    apis: ['./src/doc/user-api.js']
};

const specs = swaggerJsDocs(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};