const { DataTypes } = require("sequelize");
const { hash } = require("../../utils/functions");

//Exportamos una funcion que define el modelo y le ijectamos sequelize
module.exports = (sequelize) => {
  //Definimos el modelo
  sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", hash(value));
      },
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};
