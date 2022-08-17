const {DataTypes} = require("sequelize")

//Exportamos una funcion que define el modelo y le ijectamos sequelize
module.exports = (sequelize) => {
    //Definimos el modelo
    sequelize.define("Product_Size", {
        stock: {
            type: DataTypes.INTEGER
        }
    })
}