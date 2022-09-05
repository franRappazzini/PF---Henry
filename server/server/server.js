const cors = require("cors");
const express = require("express");
const { sequelize } = require("../db/db");
const brand = require("./routes/brand");
const size = require("./routes/size");
const category = require("./routes/category");
const server = express();
const product = require("./routes/product");
const user = require("./routes/user");
const dotenv= require("dotenv");
const mercadopago1 = require("./routes/mercadopago");

dotenv.config();

const mercadopago1 = require("./routes/mercadopago");

const bought = require("./routes/bought");

server.use(cors());
server.use(express.json());
server.use("/product", product);
server.use("/category", category);
server.use("/brand", brand);
server.use("/size", size);
server.use("/user", user);
server.use("/mercadopago", mercadopago1);


server.use("/mercadopago", mercadopago1);

server.use("/bought", bought);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  sequelize.sync({ force: false });
  console.log("Server listening on port:", port);
});
