<<<<<<< HEAD
// const {Order} = require("../db.js");
=======

>>>>>>> development
const server = require('express').Router();
const axios = require('axios');
const mercadopago = require("mercadopago");
const axios = require('axios');
const {ACCESS_TOKEN }=process.env


mercadopago.configure({
    access_token:ACCESS_TOKEN
})

async function createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
<<<<<<< HEAD
      payer_email: "test_user_1744018@testuser.com",
=======
      payer_email: "test_user_45077573@testuser.com",
>>>>>>> development
      items: [
        {
          title: "AUTO 0KM",
          description: "AUTO 0KM",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 10
        }
      ],
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/success"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }

server.get("/payment", async (req,res,next)=>{
     try {
      const payment = await createPayment();

      return res.json(payment);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create payment" });
    }
<<<<<<< HEAD

 
})

module.exports = server;


=======
})

module.exports=server;
>>>>>>> development
