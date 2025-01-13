import multer from 'multer';
import path from 'path';
import { __dirname } from './utils.js';

// declaro una configuracion de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, collback) {
        const ruta = path.join(__dirname,'..', 'public','imagenes');
        collback(null, ruta);
    },
    //declaro el nombre del imagen
    filename: function (req, file, collback) {
        const filename = `${file.fieldname}-${Date.now()}${file.originalname}`;
        collback(null, filename);
    }
})
//declaro una configuracion de uploat
const upload = multer({ storage });
export default upload;
