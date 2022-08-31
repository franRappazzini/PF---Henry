const cors = require("cors");
const express = require("express");
const { sequelize } = require("../db/db");
const brand = require("./routes/brand");
const size = require("./routes/size");
const category = require("./routes/category");
const server = express();
const product = require("./routes/product");
const user = require("./routes/user");
<<<<<<< HEAD
const mercadopago1 = require("./routes/mercadopago");
=======
const bought = require("./routes/bought")
>>>>>>> origin/development

server.use(cors());
server.use(express.json());
server.use("/product", product);
server.use("/category", category);
server.use("/brand", brand);
server.use("/size", size);
server.use("/user", user);
<<<<<<< HEAD
server.use("/mercadopago", mercadopago1);
=======
server.use("/bought", bought)

>>>>>>> origin/development
const port = process.env.PORT || 3001;

server.listen(port, () => {
  sequelize.sync({ force: false });
  console.log("Server listening on port:", port);
});
