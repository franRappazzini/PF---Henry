const {Order} = require("../db.js");
const server = require('express').Router();

const mercadopago = require("mercadopago");

const {ACCESS_TOKEN }=process.env


mercadopago.configure({
    access_token:ACCESS_TOKEN
})

server.get("/", (req,res,next)=>{
    const id_orden=1

    const carrito = [
        {title: "Producto 1", quantity:5,price:10.52},
        {title:"Producto 2",quantity:15,price:100.52},
        {title:"Producto 3", quantity:6, price:200}
    ]

    const items_ml = carrito.map (i =>({
        //Respetar este formato
        title: i.title,
        unit_price:i.price,
        quantity:i.quantity,
    }))

    let preference={
        items:items_ml, //todos los items q vamo a vender
        external_reference: `${id_orden}`, // De referencia usamos un id
        payment_methods:{
            excluded_payment_types:[    
                {
                    id:"atm" // cajero automatico
                }
            ],
            installments:3  //cantidad max de cuotas
        },
        back_urls:{
            success:'http://localhost:3001/mercadopago/pagos',
            failure:'http://localhost:3001/mercadopago/pagos',
            pending:'http://localhost:3001/mercadopago/pagos',
        },
    }

    mercadopago.preferences.create(preference)
    .then(function(response){
        global.id=response.body.id
        console.log(response.body)
        res.json({id:global.id})
    })
    .catch(function(error){
        console.log(error)
    })
})


