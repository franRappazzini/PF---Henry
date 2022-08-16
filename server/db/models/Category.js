import { DataTypes } from '@sequelize/core';

//Exportamos una funcion que define el modelo y le ijectamos sequelize
module.exports = (sequelize) => {
    //Definimos el modelo
    sequelize.define("category", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}