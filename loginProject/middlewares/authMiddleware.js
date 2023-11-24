function authMiddleware (req, res, next) {
    // Si no tengo a nadie en sesión, lo redirijo al login
    if (!req.session.userLogged) {
        return res.redirect("/user/login");
    } 
    // Si tengo a alguien en sesión sigo con lo que viene el siguiente controlador
    next();
}

module.exports  = authMiddleware;