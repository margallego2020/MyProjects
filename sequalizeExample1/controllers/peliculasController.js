// Con esto me permite interactuar con la BD
let db = require("../database/models");

let peliculasController = {
    crear: function(req, res) {
        // Quiero que me traiga todos los géneros
        db.Genero.findAll()
            // Al ser un pedido asincrónico pongo el nombre de la variable de lo que voy
            // a recibir de respuesta en el then
            .then(function(generos) {
                // Cuando tenga los géneros de la BD renderizo el form de creación pasandole los datos 
                // que quiero mostrar, en este caso los géneros
                return res.render("creacionPeliculas", {generos: generos});
            })  
    },

    guardado: function(req, res) {
        // Trabajo con la tabla de pelicula
        // Creo el usuario en la BD poniendo los campos de las columnas de la BD 
        // A la derecha pongo el nombre del campo en el formulario
        db.Pelicula.create({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
        });

        // Redirijo al listado de las peliculas
        res.redirect("/peliculas");
    },

    listado: function(req, res) {
        // Obtengo todas las peliculas de la BD
        db.Pelicula.findAll()
            // recibo las peliculas y las pongo como var para renderizar
            .then(function(peliculas) {
                // Renderizo listadoPeliculas pasandole las peliculas
                res.render("listadoPeliculas", {peliculas: peliculas})
            })
    },

    detalle: function(req, res) {
        // Busco la pelicula por primary key que viene por parámetros
        db.Pelicula.findByPk(req.params.id, {
            // tengo que decirle que incluya las rels que defini en la BD
            // tiene los nombres que dice "as"
            include: [{association: "genero"}, {association: "actores"}]
        })
            .then(function(pelicula) {
                // Renderizo vista detalle pelicula
                res.render("detallePelicula", {pelicula: pelicula})
            })        
    },

    editar: function(req, res) {
        // Pido la pelicula que quiero editar por primary key que viene por parámetros
        // Y pido todos los géneros para que el usuario modifique el género
        let pedidoPelicula = db.Pelicula.findByPk(req.params.id);
        let pedidoGeneros = db.Genero.findAll();
        // Con Promise all cuando se cumplan las 2 promesas seguimos
        Promise.all([pedidoPelicula, pedidoGeneros])
            // De la promesa recibo la pelicula a editar y los géneros
            .then(function([pelicula, generos]) {
                // Renderizo compartiendo las 2 vars
                res.render("editarPelicula", {pelicula: pelicula, generos: generos});
            })
    },

    actualizar: function(req, res) {
        // Parecido a la creación
         // Trabajo con la tabla de pelicula
        // Creo el usuario en la BD poniendo los campos de las columnas de la BD 
        // A la derecha pongo el nombre del campo en el formulario
        db.Pelicula.update({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
            }, {
                where: {
                    id: req.params.id
                }
            });

        // Redirijo al listado de la pelicula que corresponde
        res.redirect("/peliculas/"+req.params.id);
    },

    borrar: function(req, res) {
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect("/peliculas");
    }
}

module.exports = peliculasController;