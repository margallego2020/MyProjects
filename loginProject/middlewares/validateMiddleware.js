const path = require('path');

// Uso la fc body o check de express-validator para validar los campos
const { body } = require('express-validator');


// Con esto hago las validaciones
const validations = [
    body("fullName").notEmpty().withMessage("Tienes que escribir un nombre"),
    body("email")
        // Con .bail() si tengo un error para notEmpty no sigo con las
        // validaciones. Corto ahí. Sino deja pasar las validaciones
        .notEmpty().withMessage("Tienes que escribir un correo electrónico").bail()
        .isEmail().withMessage("Debes escribir un formato de correo válido"),
    body("password").notEmpty().withMessage("Tienes que escribir una contraseña"),
    body("country").notEmpty().withMessage("Tienes que elegir un país"),
    // Voy a validar el archivo. Lo tengo que hacer custom porque no hay
    body("avatar").custom((value, { req })=> {
        // Obtengo el archivo
        let file = req.file;
        
        // Configuro las extensiones permitidas
        let acceptedExtensions = [ ".jpg", ".jpeg", ".png", ".gif"]; 
        // Si no hay un archivo lanzo un error
        if (!file) {
            throw new Error("Tienes que subir una imagen");
        } else {
            // Obtengo la extensión del archivo
            let fileExtension = path.extname(file.originalname);
            // Si me envían un archivo me fijo si la extensión del archivo está en 
            // las extensiones permitidas
            // Lo niego para que sea verdadero
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`);
            };
        };

        return true;
    })
];

module.exports = validations;

/* O poner:
module.exports = [
    pongo todo lo referido a las validaciones
]

*/

