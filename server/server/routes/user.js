const { User } = require("../../db/db");
const Router = require("express");
const user = Router();

user.post("", async (req, res) => {
  const { name, lastName, email, password, isAdmin } = req.body;
  const newUser = { name, lastName, email, password, isAdmin };

  try {
    await User.create(newUser);
    res.status(200).json({ success: "User created!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = user;
