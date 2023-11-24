module.exports = function(sequelize, dataTypes) {
    // Pongo el nombre de cómo sequelize llame a our tabla
    let alias = "Actor";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
    };
    
    let config = {
        // Le pongo cómo se llama la tabla en la BD
        "tableName": "actors",
        timestamps: false
    }
        
    let Actor = sequelize.define(alias, cols, config);

    // Ahora pongo las relaciones que tiene la tabla Actor con las demás en la BD
    Actor.associate = function(models) {
       // Relación de muchos a muchos(tiene muchas). Muchos actores tienen muchas peliculas
       Actor.belongsToMany(models.Pelicula, {   
        // Le explico cómo está armada la relación
        // Le digo el nombre de la relación
        as: "peliculas",
        // La tabla intermedia de la BD
        through: "actor_movie",    
        // Las claves foráneas
        foreignKey: "actor_id",
        otherKey: "movie_id",
        timestamps: false
       });
    }

    return Actor;
}