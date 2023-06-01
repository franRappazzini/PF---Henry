require("dotenv").config();
const { Op, Sequelize } = require("sequelize");
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;
const fs = require("fs");
const path = require("path");

// const sequelize = new Sequelize(
//   "postgres://iwukxuix:xou9rxFqT6Web2ZTlntBSzdoP2Rixd7O@suleiman.db.elephantsql.com/iwukxuix", // CONFIGURAR CADA UNO
//   { logging: false }
// );

// para poder deployear
// const sequelize =
//   process.env.NODE_ENV === "production"
//     ? new Sequelize({
//         database: DB_NAME,
//         dialect: "postgres",
//         host: DB_HOST,
//         port: 5432,
//         username: DB_USER,
//         password: DB_PASSWORD,
//         pool: { max: 3, min: 1, idle: 10000 },
//         dialectOptions: {
//           ssl: { require: true, rejectUnauthorized: false },
//           keepAlive: true,
//         },
//         ssl: true,
//       })
//     : new Sequelize(
//         // "postgres://ppahdjqtzybfaj:5ce7f5f093976f97cdf0853ca284237ded3ef0b6fd9d7919b01a2aefc55dc72a@ec2-54-159-175-38.compute-1.amazonaws.com:5432/d1h8d8a1rn576h", // heroku
//         "postgres://iwukxuix:xou9rxFqT6Web2ZTlntBSzdoP2Rixd7O@suleiman.db.elephantsql.com/iwukxuix  ", // elephant

//         // "postgres://nxzqhyvx:G0f2IN2Wj_KgM18-rpELCYQ4zkV164ZJ@kesavan.db.elephantsql.com/nxzqhyvx", //felipe
//         // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,

//         // "postgres://hqylrscg:CjiddTbf3QlMiuaNMJVmQcy_uJvB0yVM@suleiman.db.elephantsql.com/hqylrscg", //Franco
//         {
//           logging: false,
//           // dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, // config para heroku
//         }
//       );

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});
const basename = path.basename(__filename);

const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

//Los importamos
const { Product, Rating, Size, user, Bought, Product_Size, Brand, Category, Product_Bought } =
  sequelize.models;

//Hacemos las relaciones

Rating.belongsTo(user);
user.hasMany(Rating);
Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.belongsToMany(Size, { through: Product_Size });
Size.belongsToMany(Product, { through: Product_Size });

Bought.belongsTo(user);
user.hasMany(Bought);

Product_Size.belongsToMany(Bought, { through: Product_Bought });
Bought.belongsToMany(Product_Size, { through: Product_Bought });

Product.belongsTo(Brand);
Brand.hasMany(Product);

Product.belongsToMany(Category, { through: "Product_Category" });
Category.belongsToMany(Product, { through: "Product_Category" });

module.exports = { sequelize, ...sequelize.models, Op };
