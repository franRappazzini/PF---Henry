const { Category } = require("../../db/db");
const { Router } = require("express");
const category = Router();

category.get("/", async (req, res) => {
  try {
    const response = await Category.findAll({
      attributes: ["name"],
      order: ["name"],
    });
    res.json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = category;
