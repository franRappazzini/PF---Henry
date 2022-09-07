const server = require('express').Router();

const mercadopago = require("mercadopago");
const axios = require('axios');
const {ACCESS_TOKEN }=process.env


mercadopago.configure({
    access_token:ACCESS_TOKEN
})

async function createPayment(productosCart,logedUser) {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const preferences = {
      payer_email: "test_user_45077573@testuser.com",
      items: productosCart,
      back_urls: {
        failure: "http://localhost:3000/cart",
        pending: "http://localhost:3000/purchases",
        success: "http://localhost:3000/purchases"
      },
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
    const {lsCartProducts,logedUser} =req.body
    let productosCart =[]
    console.log(logedUser)

    for (let index = 0; index < lsCartProducts.length; index++) {
      // {
      //   title: "Dummy Title",
      //   description: "Dummy description",
      //   picture_url: "http://www.myapp.com/myimage.jpg",
      //   category_id: "category123",
      //   quantity: 1,
      //   unit_price: 10
      // }

      // var payer = {
      //   name: "Charles",
      //   surname: "Luevano",
      //   email: "charles@hotmail.com",
      //   date_created: "2015-06-02T12:58:41.425-04:00",
      //   phone: {
      //     area_code: "",
      //     number: "949 128 866"
      //   },


      // ,
      // payer:{
      //       name: logedUser.given_name,
      //        surname: logedUser.family_name,
      //        email:logedUser.email
      // //   email: "charles@hotmail.com",
      // //   date_created: "2015-06-02T12:58:41.425-04:00",
      // //   phone: {
      // //     area_code: "",
      // //     number: "949 128 866"

      // }
         
      //   identification: {
      //     type: "DNI",
      //     number: "12345678"
      //   },
        
      //   address: {
      //     street_name: "Cuesta Miguel Armendáriz",
      //     street_number: "1004",
      //     zip_code: "11020"
      //   }
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
    
 
     try {
      const payment = await createPayment(productosCart,logedUser);
      return res.json(payment.init_point);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create payment" });
    }
})



async function savePayment(){


}


server.post("/success", async (req,res)=>{
  console.log(req.query)
  const order = req.query
  const user = req.body
  //Deberiamos relacionar la orden al usuario y guardarla en boguths
  try {
    savePayment(order)
  } catch (error) {
    
  }
    
})

module.exports=server;