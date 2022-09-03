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
    const {state, userId, products, finalPrice} = req.body

    try {
        const newBought = await Bought.create({state, userId, finalPrice})

        products.map(async p => {
            let findProduct_Size = await Product_Size.findOne({where: {ProductId: p.id, SizeId:p.choosedSize.id}})

            await newBought.addProduct_Size(findProduct_Size)

            findProduct_Size.stock = findProduct_Size.stock - p.choosedAmount

            findProduct_Size.save()

        })
        const userData = await user.findOne({where: {id: userId}})
        await transporter.sendMail({
            from: '"Kemba" hiram.gutkowski@ethereal.email', // sender address
            to: userData, // list of receivers
            subject: "Compra realizada", // Subject line
            text: "HOLAAAAAAAAAAAAAAAAAAAAA", // plain text body
            html: "<b>HOLANDAAAAAAAAA</b>", // html body
          })
        res.status(200).json(newBought)
        

    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }

})

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




module.exports = bought