import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'


export async function loginJWT(req, res , next){
    //todo validar que el mail y password llegan
    try {
        const { email, password } = req.body
        const user = await User.findOne({  email: email.toLowerCase() });

        // si no lo encuentro o la contraseña no coincide --> error
        if (!user || !(await user.comparePassword(password)) ) {
        next(createError(401, 'invalid credential'))
        return
        }

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