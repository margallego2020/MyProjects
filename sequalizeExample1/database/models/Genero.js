module.exports = function(sequelize, dataTypes) {
    // Pongo el nombre de cómo sequelize llame a our tabla
    let alias = "Genero";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        name: {
            type: dataTypes.STRING
        }
    };
    
    let config = {
        // Le pongo cómo se llama la tabla en la BD
        "tableName": "genres",
        timestamps: false
    }
        
    let Genero = sequelize.define(alias, cols, config);

    // Ahora pongo las relaciones que tiene la tabla Genero con las demás en la BD
    Genero.associate = function(models) {
        // Relación de 1 a muchos(tiene muchas). El género tiene muchas peliculas
        Genero.hasMany(models.Pelicula, {
            // Le explico cómo está armada la relación
            // Le digo el nombre de la relación
            as: "peliculas",
            // La clave foránea
            foreignKey: "genre_id"
        });
    }

    return Genero;


} 