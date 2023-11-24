// ok 1. Guardar user in DB
// ok 2. Buscar usuario que se quiere loguear por su email
// ok 3. Buscar usuario por su Id
// 4. Editar la info de un usuario
// ok 5. Eliminar a un usuario de la DB

const fs = require('fs');

const User = {
    fileName: "./database/users.json",
    
    // Obtengo la info del archivo JSON y lo convierto en un array de objs literales
    getData: function() {
        // Leo el archivo json y me lo devuelve en formato de string
        // Quiero que se convierta en un array para poder leerlo con JSON.parse y poder
        // trabajar con él
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
    },

    // Sirve para autogenerar el Id
    generateId: function() {
        // Traigo todos los usuarios
        let allUsers = this.findAll();
        // Traigo el último usuario
        let lastUser = allUsers.pop();
        // Si tengo usuarios
        if (lastUser) {
            // Retorno el id del último usuario + 1
            return lastUser.id + 1;
        };
        // Si no tengo usuarios retorname el 1
        return 1;
    },

    // Obtengo todos los usuarios(hace lo mismo que getData)
    findAll: function () {
        return this.getData();
    },

    // Busco usuario por Id
    findByPk: function (id) {
        // Traer a todos los usuarios
        let allUsers = this.findAll();
        // Buscame el usuario cuyo id sea = al id que te pasé como parámetro. Cuando lo
        // encuentra me devuelve el usuario
        // Si me devuelve undefined es porque no encontré al usuario
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },
    
    // Busco usuario por campo (email por ej.)
    // Cuando hago este tipo de búsquedas agarra siempre el 1 ero. cuando hay muchos 
    findByField: function (field, text) {
        // Traer a todos los usuarios
        let allUsers = this.findAll();
        // Buscame el usuario cuyo email sea = al email que te pasé como parámetro. Cuando lo
        // encuentra me devuelve el usuario
        // Si me devuelve undefined es porque no encontré al usuario
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    // Crear usuario
    create: function (userData) {
        // Traer a todos los usuarios
        let allUsers = this.findAll();
        // Creo un usuario agregando un nuevo id y los datos que me vienen de userData
        let newUser = {
            id: this.generateId(),
            ...userData,
        }
        // Le agrego al array con un push los datos del newUser
        allUsers.push(newUser);

        // Tengo que convertir al array en un archivo JSON again conservando el formato 
        // del file
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
        // Si sale ok devuelvo el nuevo usuario
        return newUser;  
    },

    // Eliminar usuario
    delete: function(id) {
        // Traer a todos los usuarios
        let allUsers = this.findAll();
        // Devuelvo todos los usuarios menos el id que le mandé
        let finalUsers = allUsers.filter(oneUser => oneUser.id != id);
        // Tengo que convertir al array en un archivo JSON again conservando el formato 
        // del file
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
        // Si sale ok devuelvo true
        return true;
        
    }
}

module.exports = User;

// console.log(User.create({
//     fullName: "Jose Perez",
//     email: "josep@p.com"
// }));

// console.log(User.generateId());
// console.log(User.delete(6));