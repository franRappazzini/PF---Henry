const { Category } = require("../../db/db");
const { Router } = require("express");
const category = Router();

category.get("", async (req, res) => {
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


category.post("", async (req, res) => {
  const {category} = req.body
  try {
    const newCategory = await Category.findOrCreate({where:{name : category}})
    res.status(200).send(newCategory)
  } catch (e) {
    res.status(400).send("There was an error, please try again")
  }
})

module.exports = category;
