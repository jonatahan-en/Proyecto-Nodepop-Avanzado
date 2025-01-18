import { REGEXP } from '../lib/utils.js';
import { User } from '../models/index.js';
import createError from 'http-errors'



export async function indexLogin(req, res, next) {
  res.locals.error = '';
  res.locals.email = '';
  res.render('login');
}

export async function postLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    //VALIDACIONES
    
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
      

    // buscar el usuario en la base de datos
    const user = await User.findOne({ email });

    // si no lo encuentro o la contraseña no coincide --> error
    if (!user || !(await user.comparePassword(password)) ) {
      res.locals.error = 'Invalid credentials';
      res.locals.email = email;
      res.render('login');
      return;
    }

    // si existe y la contraseña coincide:

    // - apuntar en la sesión del usuario, que está autenticado
    req.session.userId = user._id;
    req.session.userName = user.name;

    // - ir a zona privada
    res.redirect(req.query.redirect ?? '/');

  } catch (err) {
    next(err);
  }
}

export function logout(req, res, next) {
  req.session.regenerate(err => {
    if (err) return next(err);
    res.redirect('/');
  })
}
