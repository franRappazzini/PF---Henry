const { Router } = require("express");
const bought = Router();
const nodemailer = require("nodemailer")
const {
    Product,
    user,
    Product_Size,
    Bought,
    Category,
    Op
} = require("../../db/db")
const User=user

//NODEMAILER

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'hiram.gutkowski@ethereal.email',
        pass: 'R3ykWRrUWGUdPQ5QMS'
    }
})


bought.post("", async (req, res) => {
  // const {state, userId, products, finalPrice} = req.body

  const { lsCartProducts, order, user } = req.body;
  console.log("en el bought");
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

  let finalPrice = 0;
  lsCartProducts.forEach((e) => (finalPrice += e.price * e.choosedAmount));

  // nike {amount 3, price 10000}
  //adidas{amount 3, price 5000}

  let findPaymentId = await Bought.findOne({
    where: { payment_id: order.payment_id },
  });
  

//   if (findPaymentId) {
//     console.log("tamo aca ")
//     return res.status(400).send("La compra ya existia");
//   }

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
      state,
      userId,
      finalPrice,
      payment_id,
    });

    lsCartProducts.map(async (p) => {
      let findProduct_Size = await Product_Size.findOne({
        where: { ProductId: p.id, SizeId: p.choosedSize.id },
      });

      await newBought.addProduct_Size(findProduct_Size);

      findProduct_Size.stock = findProduct_Size.stock - p.choosedAmount;

      findProduct_Size.save();
    });

    await transporter.sendMail({
      from: '"Kemba" hiram.gutkowski@ethereal.email', // sender address
      to: user.email, // list of receivers
      subject: "Compra realizada", // Subject line
      text: "HOLAAAAAAAAAAAAAAAAAAAAA", // plain text body
      html: "<b>HOLANDAAAAAAAAA</b>", // html body
    });
    console.log(newBought);
    res.status(200).json(newBought);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

bought.get("", async (req, res) => {
    const {categoryId, brandId, user} = req.body

    try {
        const orders = await Bought.findAll({include: {model: Product_Size}})

            for(let i = 0; i < orders.length; i++) {
                for(let j = 0; j < orders[i].Product_Sizes.length; j++){
                    const prod = await Product.findOne({include: {model:Category},where: {id: orders[i].Product_Sizes[j].ProductId}})
                    
                    orders[i].Product_Sizes[j].dataValues.productData = prod
                }
            }
        const finalOrders = orders
        const finalOrdersCat = []

        if(categoryId) {
            finalOrders.forEach((ord) => {
                //Recorremos los productos de la compra
                ord.Product_Sizes.forEach((prod) => {
                    //Recorremos las categorias de cada producto
                    prod.dataValues.productData.Categories.forEach((cat) => {
                        if(cat.id === categoryId) {
                            finalOrdersCat.push(ord)
                        }
                    })
                })
            })
        }

        res.status(200).send(finalOrdersCat)
    } catch (e) {
        console.log(e)
        res.status(400).send("ERROR")
    }
    
})

bought.get("/:email", async (req,res)=>{
        const {email} = req.params
        let user = await User.findOne({where:{email:email}})
        // console.log("user:")
        // console.log(user)
        let orders = await Bought.findAll({include:{model: Product_Size},
            where:{userId:user.id}})

        // const orders = await Bought.findAll({include: {model: Product_Size}})

        for(let i = 0; i < orders.length; i++) {
            for(let j = 0; j < orders[i].Product_Sizes.length; j++){
                const prod = await Product.findOne({include: {model:Category},where: {id: orders[i].Product_Sizes[j].ProductId}})
                
                orders[i].Product_Sizes[j].dataValues.productData = prod
            }
        }

        if(orders){
            console.log("ORDERS:")
            console.log(orders)
            res.status(200).json(orders)
        }else{
            res.status(404).send("No boughts found :(")
        }
})



module.exports = bought