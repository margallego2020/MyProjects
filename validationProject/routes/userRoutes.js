const express = require('express');
const router = express.Router();
const path = require('path');

// Pido multer para usar archivos
const multer = require('multer');

// Uso la fc body o check de express-validator para validar los campos
const { body } = require('express-validator');

// Creo un disco en donde se va a almacenar nuestra info
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Pongo al callback null y le digo en donde quiero guardar los archivos
        cb(null, "./public/images/avatars");
    },
    filename: (req, file, cb) => {
        console.log(file);
        // Defino el nombre del archivo y con extname + tomo la extensión del archivo
        
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;

        // NO VA. Tira error string en pathname. let fileName = `${Date.now()}_img${path.extname(file.filename)}`;
        cb(null, fileName);
    }
});

// De multer voy a ejecutar el storage que multer necesita para subir el archivo
const uploadFile = multer({ storage });

const usersController = require("../controllers/userController");

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
        let acceptedExtensions = [ ".jpg", ".png", ".gif"]; 
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

// Defino las funciones del usuario
// Formulario de registro
router.get("/register", usersController.register);

// Procesar formulario de registro
// Sube el archivo cuyo nombre está en el campo avatar
// Después tengo que mandar un array que va a hacer todas las validaciones
router.post("/register", uploadFile.single("avatar"), validations, usersController.processRegister);



// Formulario del login
router.get("/login", usersController.login);

// Perfil del usuario
router.get("/profile/:userId", usersController.profile);

module.exports = router;