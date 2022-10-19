const {DataTypes} = require("sequelize")

//Exportamos una funcion que define el modelo y le ijectamos sequelize
module.exports = (sequelize) => {
    //Definimos el modelo
    sequelize.define("Bought", {
        date: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        finalPrice: {
            type: DataTypes.INTEGER
        },
        payment_id:{
            type:DataTypes.STRING
        },
        adress: {
            type: DataTypes.STRING
        }
        
    })
}