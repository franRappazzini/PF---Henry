const { Size } = require("../../db/db");
const { Router } = require("express");
const size = Router();

size.get("", async (req, res) => {
  try {
    const response = await Size.findAll({
      attributes: ["size"],
      order: ["size"],
    });
    res.json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = size;
