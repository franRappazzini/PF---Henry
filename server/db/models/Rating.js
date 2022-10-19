const {DataTypes} = require("sequelize")

//Exportamos una funcion que define el modelo y le ijectamos sequelize
module.exports = (sequelize) => {
    //Definimos el modelo
    sequelize.define("Rating", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        text: {
            type: DataTypes.STRING,
            allowNull: false
        },

        stars: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}