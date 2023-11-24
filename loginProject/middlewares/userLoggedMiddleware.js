// Traigo el modelo User para buscar al usuario por mail
const User = require('../models/User');

function userLoggedMiddleware(req, res, next) {
    
    res.locals.isLogged = false;
    
    // Si tengo a alguien en una cookie, quiero buscar a esa persona y poder loguear a esa persona
    // de manera automática
    // Me fijo qué vino en la cookie de userEmail
    let emailInCookie = req.cookies.userEmail;
    // Lo busco al usuario por email
    let userFromCookie = User.findByField("email", emailInCookie);
    // console.log(emailInCookie);
    // console.log(userFromCookie);

    // console.log(userFromCookie);

    // Si tengo al usuario de la cookie, voy a querer pasar a todo ese usuario a sesión
    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    // Ahora que lo tengo al usuario en userFromCookie lo paso a sesión
    // Me interesa saber si tengo a alguien en sesion
    // Si tengo a alguien en sesión, quiero mostrar una cierta parte de la barra de navegación o no.
    // Creo la variable local isLogged (a las vars locales las puedo compartir en todas las vistas
    // indistintamente del controlador) en false. Toda mi aplicación va a conocer de esta var isLogged
    // console.log("pasé por el md de userlogged");
    // Si hay alguien en sesión y si en sesión hay un userLogged a res.locals.isLogged lo pongo en true
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        // Paso a vars locales globales los datos del usuario logueado para ser compartidas 
        // por distintas vistas
        res.locals.userLogged = req.session.userLogged;
    }
    
    next();
    
}

module.exports = userLoggedMiddleware;
