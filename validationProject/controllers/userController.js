// Si bien hago las validaciones en el router, necesito agarrar las validaciones
const { validationResult } = require('express-validator');

const controller = {
    register: (req, res) => {
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

        // Cuando no tengo errores
        return res.send("Ok, las validaciones se pasaron y no tienes errores") 

    },

    login: (req, res) => {
        return res.render("userLoginForm");
    },

    profile: (req, res) => {
        return res.render("userProfile");

    }
}

module.exports = controller;