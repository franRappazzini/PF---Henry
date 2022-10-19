const { DataTypes } = require("sequelize");

//Exportamos una funcion que define el modelo y le ijectamos sequelize
module.exports = (sequelize) => {
  //Definimos el modelo
  sequelize.define(
    "user",
    {
      given_name: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      family_name: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        // allowNull: false,
        // set(value) {
        //   this.setDataValue("password", hash(value));
        // },
      },
      picture: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        // allowNull: false,
        defaultValue: false,
      },
      isSocial: {
        type: DataTypes.BOOLEAN,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isBanned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
