
const express = require('express');
const router = express.Router();

const usersController = require("../controllers/userController");

const uploadFile = require("../middlewares/multerMiddleware");
const validations = require("../middlewares/validateMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// Defino las funciones del usuario
// Formulario de registro. Chequeo antes si el user está logueado: si está lo redirijo al profile
router.get("/register", guestMiddleware, usersController.register);

// Procesar formulario de registro
// Sube el archivo cuyo nombre está en el campo avatar
// Después tengo que mandar un array que va a hacer todas las validaciones
router.post("/register", uploadFile.single("avatar"), validations, usersController.processRegister);

// Formulario del login. Chequeo antes si el user está logueado: si está lo redirijo al profile
router.get("/login", guestMiddleware, usersController.login);

// Proceso formulario de login
router.post("/login", usersController.loginProcess);

// Perfil del usuario
router.get("/profile/", authMiddleware, usersController.profile);

// Logout
router.get("/logout", usersController.logout);

module.exports = router;