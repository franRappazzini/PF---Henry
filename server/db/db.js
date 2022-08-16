require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;

// const sequelize = new Sequelize(
//   `postgres://user:pass@example.com:5432/dbname`, // CONFIGURAR CADA UNO
//   { logging: false }
// );

// para poder deployear
const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: { max: 3, min: 1, idle: 10000 },
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false }
      );

module.exports = { sequelize };
