const {DataTypes} = require("sequelize")

//Exportamos una funcion que define el modelo y le ijectamos sequelize
module.exports = (sequelize) => {
    //Definimos el modelo
    sequelize.define("Size", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}