const express = require('express');
const app = express();
const path = require('path');

// Configuro ejs como el motor del template engine de la app
app.set("view engine", "ejs");
// Defino la ubicación de la carpeta de las vistas
app.set("views", path.join(__dirname, "./views"));
// Configuro acceso a la carpeta de recursos estáticos 
app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/", (req, res) => {
    // res.send("Hola Martin!!!!!");
    res.render("../src/views/index");
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));

