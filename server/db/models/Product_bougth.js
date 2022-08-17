const {DataTypes} = require("sequelize")

//Exportamos una funcion que define el modelo y le ijectamos sequelize
module.exports = (sequelize) => {
    //Definimos el modelo
    sequelize.define("Product_bougth", {
        date: {
            type: DataTypes.DATE
        },
        state: {
            type: DataTypes.STRING
        }
    })
}