const { Router } = require("express");
const bought = Router();
const nodemailer = require("nodemailer");
const {
  Product,
  user,
  Product_Size,
  Bought,
  Category,
  Product_Bought,
  Size,
  Brand,
} = require("../../db/db");
const User = user;

//NODEMAILER

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "cryptorig2021@gmail.com",
    pass: "yxakhnkeafnlnaue",
  },
});

bought.post("", async (req, res) => {
  // const {state, userId, products, finalPrice} = req.body

  const { lsCartProducts, order, user, adress } = req.body;
  //  console.log(req.body)
  // const products = bought[0]
  // const order =bought[1]
  // const User =bought[2]
  let state = "";
  if (order.status === "approved") {
    state = "In progress";
  } else if (order.status === "pending") {
    state = "Pending to pay";
  } else {
    console.log("Status failed");
    return;
  }
  let date = Date();

  let finalPrice = 0;
  lsCartProducts.forEach((e) => (finalPrice += e.price * e.choosedAmount));

  // nike {amount 3, price 10000}
  //adidas{amount 3, price 5000}

  let findPaymentId = await Bought.findOne({
    where: { payment_id: order.payment_id },
  });

  if (findPaymentId) {
    console.log("tamo aca ");
    return res.status(400).send("La compra ya existia");
  }

  try {
    const findByEmail = await User.findOne({ where: { email: user.email } });
    const userId = findByEmail.dataValues.id;
    const payment_id = order.payment_id;
    // console.log("------------------");
    // // console.log(findByEmail)
    // // console.log(userId)
    // console.log("Payment id:")
    // console.log(findPaymentId)
    const newBought = await Bought.create({
      date,
      adress,
      state,
      userId,
      finalPrice,
      payment_id,
    });

    lsCartProducts.map(async (p) => {
      let findProduct_Size = await Product_Size.findOne({
        where: { ProductId: p.id, SizeId: p.choosedSize.id },
      });

      await newBought.addProduct_Size(findProduct_Size, { through: { amount: p.choosedAmount } });

      findProduct_Size.stock = findProduct_Size.stock - p.choosedAmount;

      findProduct_Size.save();
    });

    await transporter.sendMail({
      from: '"Kemba"', // sender address
      to: user.email, // list of receivers
      subject: "Compra realizada", // Subject line
      text: "HOLAAAAAAAAAAAAAAAAAAAAA", // plain text body
      html: "<b>HOLANDAAAAAAAAA</b>", // html body
    });
    res.status(200).json(newBought);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

bought.get("", async (req, res) => {
  const { category, brand, state } = req.body;
  var categoryId = "";
  var brandId = "";

  if (category && category !== "All") {
    const cat = await Category.findOne({ where: { name: category } });
    categoryId = cat.id;
  }

  if (brand && brand !== "All") {
    const br = await Brand.findOne({ where: { name: brand } });
    brandId = br.id;
  }

  try {
    let model;
    if (state) {
      model = { include: { model: Product_Size }, where: { state } };
    } else model = { include: { model: Product_Size } };
    const orders = await Bought.findAll(model);

    for (let i = 0; i < orders.length; i++) {
      const userData = await User.findByPk(orders[i].userId);

      orders[i].dataValues.userData = userData.dataValues;
      for (let j = 0; j < orders[i].Product_Sizes.length; j++) {
        const prod = await Product.findOne({
          include: { model: Category },
          where: { id: orders[i].Product_Sizes[j].ProductId },
        });

        orders[i].Product_Sizes[j].dataValues.productData = prod;
      }
    }
    const finalOrders = orders;
    const finalOrdersCat = [];
    const finalOrdersBrand = [];

    if (category && category !== "All") {
      finalOrders.forEach((ord) => {
        //Recorremos los productos de la compra
        ord.Product_Sizes.forEach((prod) => {
          //Recorremos las categorias de cada producto
          prod.dataValues.productData.Categories.forEach((cat) => {
            if (cat.id == categoryId) {
              finalOrdersCat.push(ord);
            }
          });
        });
      });
    }

    if (brand && brand !== "All") {
      let actual;
      if (category && category !== "All") actual = finalOrdersCat;
      else actual = finalOrders;
      actual.forEach((ord) => {
        //Recorremos los productos de la compra
        ord.Product_Sizes.forEach((prod) => {
          //Recorremos las marcas de cada producto y si coincide agregamos todo la compra
          if (prod.dataValues.productData.BrandId == brandId) {
            finalOrdersBrand.push(ord);
          }
        });
      });
    }

    if (brand && brand !== "All") {
      res.status(200).send(finalOrdersBrand);
    } else if (category && category !== "All") {
      res.status(200).send(finalOrdersCat);
    } else res.status(200).send(finalOrders);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

bought.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    let user = await User.findOne({ where: { email: email } });
    // console.log("user:")
    // console.log(user)
    console.log("------------");
    let orders = await Bought.findAll({
      include: { model: Product_Size },
      where: { userId: user.id },
    });
    // const orders = await Bought.findAll({include: {model: Product_Size}})
    console.log("------------");
    console.log(orders);
    console.log("------------");
    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].Product_Sizes.length; j++) {
        const size = await Size.findByPk(orders[i].Product_Sizes[j].SizeId);
        const prod = await Product.findOne({
          include: { model: Category },
          where: { id: orders[i].Product_Sizes[j].ProductId },
        });

        orders[i].Product_Sizes[j].dataValues.SizeId = size;
        orders[i].Product_Sizes[j].dataValues.productData = prod;
      }
    }
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).send("No boughts found :(");
    }
  } catch (e) {
    console.log(e);
  }
});

bought.put("", async (req, res) => {
  const { boughtId, state } = req.body;
  try {
    const bought = await Bought.findByPk(boughtId);

    const user = await User.findByPk(bought.userId);

    await transporter.sendMail({
      from: '"Kemba"', // sender address
      to: user.email, // list of receivers
      subject: `Tu compra se encuentra ${state}`, // Subject line
      text: "HOLAAAAAAAAAAAAAAAAAAAAA", // plain text body
      html: "<b>HOLANDAAAAAAAAA</b>", // html body
    });

    console.log("HOLA");
    await Bought.update(
      {
        state: state,
      },
      {
        where: {
          id: boughtId,
        },
      }
    );
    res.status(200).send("State changed successfully");
  } catch (e) {
    console.log(e);
  }
});

module.exports = bought;
