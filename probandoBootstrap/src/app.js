const express = require('express');
const app = express();
const path = require('path');

// Defino motor que utilizo en ejs y la carpeta para ver las vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Coloco la carpeta public como estática
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));

