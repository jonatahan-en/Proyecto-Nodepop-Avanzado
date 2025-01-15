
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

const options = {
    definition: {
        openapi: '3.0.3',
        info:{
            title: 'Nodepop API',
            version: '0.1',
            description: 'API de Nodepop'
        }
    },
    apis: ["controllers/api/**/*.js"]
}

const specification = swaggerJSDoc(options)



export default [swaggerUI.serve, swaggerUI.setup(specification)]