const cors = require("cors");
const express = require("express");
const { sequelize } = require("../db/db");
const server = express();
const product = require("./routes/product");

server.use(cors());
server.use(express.json());
server.use("/product", product);

server.listen(3001, () => {
  sequelize.sync({ force: false });
  console.log("Server listening on port: 3001");
});
