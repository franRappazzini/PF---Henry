const { Brand } = require("../../db/db");
const { Router } = require("express");
const brand = Router();

brand.get("", async (req, res) => {
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

brand.get("/upload", (req, res) => {
  const allBrands = ["Adidas", "New Balance", "Nike", "Puma", "Reebok"];

  try {
    allBrands.forEach(
      async (brand) =>
        await Brand.findOrCreate({
          where: { name: brand },
          default: { name: brand },
        })
    );

    res.json({ success: "Uploaded Brands!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = brand;
