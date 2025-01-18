import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import { REGEXP } from '../../lib/utils.js';



export async function loginJWT(req, res , next){
    try {
        const { email, password } = req.body


         // Validar que email y password estén presentes
        if (!email || !password) {
            throw createError(400, 'Email y password son requeridos');
        }
    
        // Validar formato del email
        const emailRegExp = new RegExp(REGEXP.mail);
        if (!emailRegExp.test(email)) {
            throw createError(400, 'El email no tiene un formato válido');
        }
    
        // Validar longitud del password
        if (password.length < 3) {
            throw createError(400, 'El password debe tener al menos 3 caracteres');
        }
        
        const user = await User.findOne({  email: email.toLowerCase() });
        console.log()
        // si no lo encuentro o la contraseña no coincide --> error
        if (!user || !(await user.comparePassword(password))) {
        next(createError(401, 'invalid credential'))
        return
        }
        console.log(process.env.JWT_SECRET)

        // si lo encuentro y coincide con la contraseña => emitir un JWT
        jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{
            expiresIn: '2d'
        },(err, tokenJWT) => {
            if(err) {
                next(err)
                return
            }
            res.json({ tokenJWT })
        })
    } catch (error) {
        next(error)
    }
}