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

userRouter.post("/:email", async (req, res) => {
  const { email } = req.params;
  const { given_name, family_name, picture, sub } = req.body;

  try {
    const isSocial = sub ? true : false;
    const options = {
      where: { email },
      defaults: { given_name, family_name, email, picture, isSocial },
      // include: [{ model: Bougth }, { model: Rating }],
    };

    const [response, created] = await user.findOrCreate(options);
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
    res.status(404).send("get users error");
  }
});

userRouter.put("/:currentEmail", async (req, res) => {
  const { currentEmail } = req.params;
  const { given_name, email, family_name, picture, isAdmin } = req.body;
  console.log(req.body);

  try {
    const response = await user.findOne({ where: { email: currentEmail } });
    console.log(response);

    if (isAdmin?.option) await response.update({ isAdmin });
    else await response.update({ given_name, family_name, email, picture });
    res.status(200).json({ success: "User update!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

userRouter.put("/", async (req, res) => {
  const { id } = req.query;
  const { isAdmin, isBanned } = req.body;

  try {
    const response = await user.findByPk(id);
    if (isAdmin || isAdmin === false) response.isAdmin = isAdmin;
    if (isBanned || isBanned === false) response.isBanned = isBanned;
    await response.save();
    res.status(200).json({ success: `User ${response.email} update!` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// userRouter.get("/:email", async (req, res) => {
//   const { email } = req.params;

//   try {
//     const include = [{ model: Bougth }, { model: Rating }];
//     const response = await user.findOne({ where: { email }, include });
//     res.json(response);
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//   }
// });

module.exports = userRouter;
