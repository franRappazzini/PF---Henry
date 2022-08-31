const { Router } = require("express");
const bought = Router();
const {
    Product,
    User,
    Product_Size,
    Bougth
} = require("../../db/db")

bought.post("", async (req, res) => {
    const {state, userId, products, finalPrice} = req.body

    try {
        const newBought = await Bougth.create({state, userId, finalPrice})

        products.map(async p => {
            let findProduct_Size = await Product_Size.findOne({where: {ProductId: p.id, SizeId:p.choosedSize.id}})
            
            await newBought.addProduct_Size(findProduct_Size)

            findProduct_Size.stock = findProduct_Size.stock - p.choosedAmount

            findProduct_Size.save()

        })
        res.status(200).json(newBought)

    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }

})




module.exports = bought