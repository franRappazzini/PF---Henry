import { DataTypes } from '@sequelize/core';

//Exportamos una funcion que define el modelo y le ijectamos sequelize
module.exports = (sequelize) => {
    //Definimos el modelo
    sequelize.define("product", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        image: {
            type: DataTypes.ARRAY,
            allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },

        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    })
}