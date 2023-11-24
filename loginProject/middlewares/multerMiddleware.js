const path = require('path');

// Pido multer para usar archivos
const multer = require('multer');


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

module.exports = uploadFile;