// Sirve para hashear la password del usuario
const bcryptjs = require('bcryptjs');


// Si bien hago las validaciones en el router, necesito agarrar las validaciones
const { validationResult } = require('express-validator');

// Uso el módulo del model de BD en Json de User
const User = require('../models/User');

const controller = {
    register: (req, res) => {
        // console.log(req.cookies.userEmail);
        return res.render("userRegisterForm");
    },

    processRegister: (req, res) => {
        // return res.send("Ok. Viniste por post");
        // return res.send({
        //     body: req.body,
        //     file: req.file
        // });
        // validationResult espera que le mande todo el req. Hace la validación y me manda 
        // los campos que tuvieron errores en la validación
        const resultValidation = validationResult(req);

        // return res.send(resultValidation.mapped());
        // return res.send(resultValidation);
        // Quiero que los errores se muestren en la vista
        // Me fijo si hubo errores en la validación
        if (resultValidation.errors.length > 0) {
            // Paso la vista con el array de los errores convertidos en un objeto literal
            // donde c/ obj literal va a tener las propiedades
            return res.render("userRegisterForm", {
                errors: resultValidation.mapped(),
                // Mando los datos que viajaron en el req del body
                oldData: req.body
            });
        }

        // console.log(req.body, req.file);

        // Antes de crear al usuario, me tengo que fijar que no haya un usuario con el 
        // mismo mail, buscando al usuario por el mail
        let userInDB = User.findByField("email", req.body.email);
        // Si el usuario está en la DB, no voy a hacer el registro, voy a retornar un error
        // informando que el usuario ya está registrado y no puede volver a registrarse
        if (userInDB) {
            // Le mando el error del new message
            return res.render("userRegisterForm", {
                errors: {
                    email: {
                        msg: "Este email ya está registrado"
                    }
                },
                // Mando los datos que viajaron en el req del body
                oldData: req.body
            });
        }

        // return res.send(userInDB);



        // Si no tengo errores de validación
        // Quiero hashear la password y agregarle al usuario la imagen
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename 
        }

        // Si paso las validaciones creo el usuario en la DB
        let userCreated = User.create(userToCreate);

        // Cuando no tengo errores
        // return res.send("Ok, las validaciones se pasaron y no tienes errores") 
        // return res.send("Ok, se guardó el usuario") 
        return res.redirect("/user/login");

    },

    login: (req, res) => {
        // console.log(req.session);
        return res.render("userLoginForm");
    },

    loginProcess: (req, res) => {
        // Tengo que fijarme en el body del request si con el mail tengo a esta persona
        // registrada
        let userToLogin = User.findByField("email", req.body.email);
        
        // Si se encontró el usuario, mando un mensaje
        if (userToLogin) {
            // return res.send(userToLogin);
            // Una vez encontrado el usuario, necesito saber si la password que tengo en 
            // la BD es la misma que vino en el request
            // Como la password está hasheada, hay que convertirla
            // Comparo si la password hasheada es la misma que ingresé en el formulario de
            // login
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            // Si está bien la password ingreso, sino
            if (isOkThePassword) {
                // Cuando ingresa el usuario quiero mantenerlo sesión: le paso los datos
                // Por seguridad le borro el dato del password
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                // Pregunto si en el request del body vino recordar (remember_user) tildado
                // Si vino tildado voy a querer setear la cookie
                if (req.body.remember_user) {
                    res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 60});
                }

                // Al ingresar voy a redirigir al usuario a una vista llamada userProfile
                res.redirect("/user/profile/");

                // return res.send("Ok puedes ingresar");
            }
            // Si la password no coincide muestro en el campo password un mensaje de error
            return res.render("userLoginForm", {
                errors: {
                    email: {
                        msg: "Las credenciales son inválidas"
                    }
                }
            });

        }
        // Si no se encontró un usuario, renderizo la vista del login y le paso la variable
        // errors le paso un objeto literal con el mensaje de error en el campo email 
        // que no se encontró el usuario en la DB

        return res.render("userLoginForm", {
            errors: {
                email: {
                    msg: "No se encuentra este email en nuestra base de datos"
                }
            }
        });
        // return res.send(userToLogin);
    },

    profile: (req, res) => {
        console.log(req.cookies.userEmail);
        // console.log("Estás en profile");
        // console.log(req.session);
        // Le paso los datos del usuario en sesión a la vista
        return res.render("userProfile", {
            user: req.session.userLogged
        });
    },

    logout: (req, res) => {
        // Destruyo la cookie de userEmail 
        res.clearCookie("userEmail");
        // Borro los datos que hay en sesión
        req.session.destroy();
        console.log(req.session);
        // Redirijo al homepage
        return res.redirect("/");
    }
}

module.exports = controller;