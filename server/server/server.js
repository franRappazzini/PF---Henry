const cors = require("cors");
const express = require("express");
const { sequelize } = require("../db/db");
const brand = require("./routes/brand");
const size = require("./routes/size");
const category = require("./routes/category");
const server = express();
const product = require("./routes/product");

server.use(cors());
server.use(express.json());
server.use("/product", product);
server.use("/category", category);
server.use("/brand", brand);
server.use("/size", size);

server.listen(3001, () => {
  sequelize.sync({ force: false });
  console.log("Server listening on port: 3001");
});
