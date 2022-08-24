require("dotenv").config();
const { Op, Sequelize } = require("sequelize");
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;
const fs = require("fs");
const path = require("path");

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
        "postgres://iwukxuix:xou9rxFqT6Web2ZTlntBSzdoP2Rixd7O@suleiman.db.elephantsql.com/iwukxuix",
        // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false }
      );

const basename = path.basename(__filename);

const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

//Los importamos
const { Product, Rating, Size, user, Bougth, Product_Size, Brand, Category } =
  sequelize.models;

//Hacemos las relaciones

Rating.belongsTo(user);
user.hasMany(Rating);
Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.belongsToMany(Size, { through: Product_Size });
Size.belongsToMany(Product, { through: Product_Size });

Bougth.belongsTo(user);
user.hasMany(Bougth);

Product.belongsToMany(Bougth, { through: "Product_bougth" });
Bougth.belongsToMany(Product, { through: "Product_bougth" });

Product.belongsTo(Brand);
Brand.hasMany(Product);

Product.belongsToMany(Category, { through: "Product_Category" });
Category.belongsToMany(Product, { through: "Product_Category" });

module.exports = { sequelize, ...sequelize.models, Op };
