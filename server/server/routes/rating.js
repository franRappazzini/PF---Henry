const { Rating } = require("../../db/db");
const { Router } = require("express");
const rating = Router();

rating.get("/", async (req, res) => {
    try {
      const response = await Rating.findAll({
        attributes: ["text", "stars"]
      });
      res.json(response);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });

  rating.post("/", async (req, res) => {
    const { text, stars, productId } = req.body;
    const newReview = { text, productId, stars };
  
    try { 
        let findProduct = await Product.findAll({
            attributes: ["id"],
            where: {
              id: productId,
            },
          });
      const createdReview = await Rating.create(newReview);
      await createdReview.addProduct(findProduct)

      // FALTA TODO LO DEL USER
      
      res.status(200).json({ success: "Your review was posted!" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })

module.exports = rating;