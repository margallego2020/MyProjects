const express = require('express');
const app = express();
const path = require('path');
// La sesión se guarda del lado del servidor
// Permite manejar las cookies (es todo lo que se guarda del lado del navegador). Se pueden guardar
// por navegador o servidor
const cookies = require('cookie-parser');

// Permite mantener los datos en sesión. Permite acceder a todo lo que tenga en el req. 
// Lo uso como un middleware de aplicación
const session = require('express-session');

// Es un middleware de aplicación
// Permite mostrar partes de la barra de navegación dependiendo si el usuario está logueado o no.
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

// Permite acceder a todo lo que tenga en el req
app.use(session({
    secret: "It's a secret",
    resave: false,
    saveUninitialized: false
}));

// Permite usar las cookies
app.use(cookies());

// Ahora lo uso al middleware
app.use(userLoggedMiddleware);


// Permite capturar la info que recibo del formulario vía POST
app.use(express.urlencoded({extended: false}));

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
app.use("/user", userRoutes);



// Levanto el servidor en localhost:3000
app.listen(3000, () => console.log("Levantando el servidor en http://localhost:3000"  ));

// Si hay un error le digo que busque la página de error
// app.use( (req, res, next) => {
//     res.status(404).render("404");
// });