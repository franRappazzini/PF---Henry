const {DataTypes} = require("sequelize")

//Exportamos una funcion que define el modelo y le ijectamos sequelize
module.exports = (sequelize) => {
    //Definimos el modelo
    sequelize.define("Bought", {
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        state: {
            type: DataTypes.STRING
        },
        finalPrice: {
            type: DataTypes.INTEGER
        },
        
    })
}