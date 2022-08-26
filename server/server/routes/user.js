const { user, Rating, Bougth } = require("../../db/db");
const Router = require("express");
const userRouter = Router();

// este lo saque porque se crea con auth
// userRouter.post("", async (req, res) => {
//   const { name, lastName, email, password, isAdmin } = req.body;
//   const newUser = { name, lastName, email, password, isAdmin };

//   try {
//     await user.create(newUser);
//     res.status(200).json({ success: "User created!" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

userRouter.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const include = [{ model: Bougth }, { model: Rating }];
    const response = await user.findOne({ where: { email }, include });
    res.json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
userRouter.get("", async (req, res) => {
  try {
    const response = await user.findAll();
    res.json(response);
  } catch (err) {
    res.status(404).send('get users error');
  }
});

module.exports = userRouter;
