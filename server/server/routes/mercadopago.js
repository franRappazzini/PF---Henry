const server = require('express').Router();

const mercadopago = require("mercadopago");
const axios = require('axios');
const {ACCESS_TOKEN }=process.env


mercadopago.configure({
    access_token:ACCESS_TOKEN
})

async function createPayment(productosCart) {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const preferences = {
      payer_email: "test_user_45077573@testuser.com",
      items: productosCart,
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/success"
      }
    };

    const payment = await axios.post(url, preferences, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }

server.post("/payment", async (req,res,next)=>{
    const {lsCartProducts} =req.body
    let productosCart =[]

    for (let index = 0; index < lsCartProducts.length; index++) {
      // {
      //   title: "Dummy Title",
      //   description: "Dummy description",
      //   picture_url: "http://www.myapp.com/myimage.jpg",
      //   category_id: "category123",
      //   quantity: 1,
      //   unit_price: 10
      // }
        let product={
          title:lsCartProducts[index].name,
          picture_url:lsCartProducts[index].image,
          category_id:lsCartProducts[index].Brand.name,
          quantity:lsCartProducts[index].choosedAmount,
          unit_price:lsCartProducts[index].price
        }
        productosCart.push(product)
    }
    
    console.log(productosCart)
     try {
      const payment = await createPayment(productosCart);
      return res.json(payment.init_point);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create payment" });
    }
})

module.exports=server;