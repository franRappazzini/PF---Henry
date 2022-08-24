const cors = require("cors");
const express = require("express");
const { sequelize } = require("../db/db");
const brand = require("./routes/brand");
const size = require("./routes/size");
const category = require("./routes/category");
const server = express();
const product = require("./routes/product");
const user = require("./routes/user");

server.use(cors());
server.use(express.json());
server.use("/product", product);
server.use("/category", category);
server.use("/brand", brand);
server.use("/size", size);
server.use("/user", user);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(sequelize.models);
  sequelize.sync({ force: true });
  console.log("Server listening on port:", port);
});
