export function changeLocale(req,res,next){
    const locale = req.params.locale;
    //poner una cookie con en la respuesta
    res.cookie('nodepop-locale', locale, 
        {maxAge: 1000 * 60 * 60 * 24 * 20}); //20 días

    //redirigir a la página anterior
    res.redirect("back");
}
    