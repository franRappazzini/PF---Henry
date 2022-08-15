require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  `postgres://user:pass@example.com:5432/dbname`, // CONFIGURAR CADA UNO
  { logging: false }
);

module.exports = { sequelize };
