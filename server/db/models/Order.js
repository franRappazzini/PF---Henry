const {DataTypes} = require("sequelize")

//Exportamos una funcion que define el modelo y le ijectamos sequelize
module.exports = (sequelize) => {
    //Definimos el modelo
    sequelize.define("order", {
     status:{
        type:DataTypes.ENUM('created','processing','cancelled','completed'),
        allowNull:false
    },
    payment_id:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    payment_status:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    merchant_order_id:{
        type:DataType.BIGINT,
        defaultValue:0
    }
    })
}