const express = require('express');
const app = express();
const path = require('path');

// Defino carpeta public como archivos estáticos
app.use(express.static("./public"));

// Defino a ejs como template engine
app.set("view engine", "ejs");
// Defino la ubicación de la carpeta views
app.set("views", path.join(__dirname, "/views"));

// Defino los routers
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes");

// Defino los links de las rutas
app.use("/", mainRoutes);
app.use("/users", userRoutes);


// Si hay un error le digo que busque la página de error
// app.use( (req, res, next) => {
//     res.status(404).render("404");
// });

// Levanto el servidor en localhost:3000
app.listen(3000, () => console.log("Levantando el servidor en http://localhost:3000"  ));
