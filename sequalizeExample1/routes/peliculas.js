const express = require('express');
const router = express.Router();

const peliculasController = require("../controllers/peliculasController");

// Creación de peliculas
router.get("/crear", peliculasController.crear);

// Registro de la pelicula
router.post("/crear", peliculasController.guardado);

// Listado de peliculas
router.get("/", peliculasController.listado);

// Detalle de pelicula
router.get("/:id", peliculasController.detalle);

// Actualizar pelicula
router.get("/editar/:id", peliculasController.editar);

// Actualizar pelicula
router.post("/editar/:id", peliculasController.actualizar);

// Borrado de pelicula
router.post("/borrar/:id", peliculasController.borrar);

module.exports = router;