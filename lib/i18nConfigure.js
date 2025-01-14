import { I18n } from 'i18n';
import path from 'path';
import { __dirname } from './utils.js';

const i18n = new I18n({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '..', 'locales'),
    defaultLocale: 'en', // idioma por defecto
    autoReload: true, // recargar locales si cambian
    syncFiles: true, // sincronizar locales si cambian
    cookie: 'nodepop-locale',
});
export default i18n; 


