module.exports = function(sequelize, dataTypes) {
    // Pongo el nombre de cómo sequelize llame a our tabla
    let alias = "Pelicula";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        title: {
            type: dataTypes.STRING
        },
        awards: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        length: {
            type: dataTypes.INTEGER
        },
        genre_id: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        }
    };
    
    let config = {
        // Le pongo cómo se llama la tabla en la BD
        "tableName": "movies",
        timestamps: false
    }
        
    let Pelicula = sequelize.define(alias, cols, config);

     // Ahora pongo las relaciones que tiene la tabla Genero con las demás en la BD
     Pelicula.associate = function(models) {
        // Relación de uno a muchos. La pelicula pertenece a un solo género
        Pelicula.belongsTo(models.Genero, {
            // Le explico cómo está armada la relación
            // Le digo el nombre de la relación
            as: "genero",
            // La clave foránea
            foreignKey: "genre_id"
        });

        // Relación de muchos a muchos(tiene muchas). Una pelicula se va a relacionar con muchos actores
        Pelicula.belongsToMany(models.Actor, {   
        // Le explico cómo está armada la relación
        // Le digo el nombre de la relación
        as: "actores",
        // La tabla intermedia de la BD
        through: "actor_movie",    
        // Las claves foráneas
        foreignKey: "movie_id",
        otherKey: "actor_id",
        timestamps: false
       });
    }

    return Pelicula;
}