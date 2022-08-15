const cors = require("cors");
const express = require("express");
const { sequelize } = require("../db/db");
const server = express();

server.use(cors());
server.use(express.json());

server.listen(3001, () => {
  sequelize.sync({ force: false });
  console.log("Server listening on port: 3001");
});
