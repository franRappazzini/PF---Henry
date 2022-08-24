const { user } = require("../../db/db");
const Router = require("express");
const userRouter = Router();

userRouter.post("", async (req, res) => {
  const { name, lastName, email, password, isAdmin } = req.body;
  const newUser = { name, lastName, email, password, isAdmin };

  try {
    await user.create(newUser);
    res.status(200).json({ success: "User created!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = userRouter;
