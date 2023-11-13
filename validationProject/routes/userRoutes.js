const express = require('express');
const router = express.Router();

const usersController = require("../controllers/userController");

// Defino las funciones del usuario
// Formulario de registro
router.get("/register", usersController.register);

// Procesar formulario de registro
router.post("/register", usersController.processRegister);



// Formulario del login
router.get("/login", usersController.login);

// Perfil del usuario
router.get("/profile/:userId", usersController.profile);

module.exports = router;