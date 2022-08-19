const { Brand } = require("../../db/db");
const { Router } = require("express");
const brand = Router();

brand.get("/", async (req, res) => {
  try {
    const response = await Brand.findAll({
      attributes: ["name"],
      order: ["name"],
    });
    res.json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = brand;
