require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;
const fs = require('fs');
const path = require('path');

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

const basename = path.basename(__filename);

const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

//Los importamos
const {Product, Rating, Size, User, Product_bougth, Product_Size, Brand} = sequelize.models

//Hacemos las relaciones

User.belongsTo(Rating);
Product.belongsTo(Rating);
Product.belongsToMany(Size, {through: Product_Size})
Product.belongsTo(User, {through: Product_bougth})
Product.belongsTo(Brand)

module.exports = { sequelize };
