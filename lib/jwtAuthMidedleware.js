//PROTECCION CON JSONWEBTOKEN
import jwt from 'jsonwebtoken'
import createError from 'http-errors'

export  function guard (req, res, next) {
    // sacar el tokenJWT de la cabecera . body o de la query-string
    const tokenJWT = req.get('Authorization') || req.body.jwt || req.query.jwt

    //si no tengo token => error
    if (!tokenJWT) {
        next(createError(401, 'No token providen'))
    return
    }

    // Compruebo que el toquen es valido
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            next(createError(401, 'invalid token'))
            return
        }
        //apuntamos el id del usuario logado en la request para que los proximos mildedelrare puedan leerlo
        req.apiUserId = payload._id
        next()
    })
}
