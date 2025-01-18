
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

const options = {
            definition: {
            openapi: '3.0.3',
            info: {
                title: 'Nodepop API',
                version: '1.0.0',
                description: 
                'Nodepop API es una API RESTful diseñada para gestionar productos y usuarios en Nodepop. Ofrece funcionalidades como autenticación, creación, actualización, búsqueda y eliminación de productos con filtros avanzados',
                contact:{
                    'name': 'Jonathan',
                    'email': 'jonatahan_enriquez@hotmail.com',
                },
            },
            components: {
                securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'Bearer',
                    bearerFormat: 'JWT',
                    descripcion: 'JWT Authorization header. Example: "Authorization: {token}"'
                },
            },
        },
            security: [
            { BearerAuth: [] },
        ],
    },
    apis: ['swagger.yaml'],
};

const specification = swaggerJSDoc(options)



export default [swaggerUI.serve, swaggerUI.setup(specification)]