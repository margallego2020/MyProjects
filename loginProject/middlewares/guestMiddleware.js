function guestMiddleware(req, res, next) {
    //  Pregunto si tengo un usuario logueado en sesión.
    // Si hay alguien quiero que el sistema automatically lo redirija al profile
    // Si no tengo a nadie en sesión quiero que el proceso el request siga con su cadena de peticiones 
    // haciendo next   
    if (req.session.userLogged) {
        return res.redirect("/user/profile");
    } 
    next(); 
    
}

module.exports = guestMiddleware;