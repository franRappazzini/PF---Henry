const { Rating, Product, user } = require("../../db/db");
const { Router } = require("express");
const rating = Router();

rating.get("/", async (req, res) => {
    try {
      const response = await Rating.findAll({
        attributes: ["text", "stars", "username"]
      });
      res.json(response);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });

  rating.post("/", async (req, res) => {
    const { text, simplecontrolled, userId, productId, username } = req.body;
    const stars = simplecontrolled
    const newReview = { text, username, stars };
    try { 
        const myProduct = await Product.findOne({where:{id:productId}})
        const myUser = await user.findOne({where:{id:userId}})
        console.log("en post 1")
      const createdReview = await Rating.create(newReview);
      console.log("en post 2")
      await myProduct.addRating(createdReview.id)
      console.log("en post 3")
      await myUser.addUser(createdReview.id)
      console.log("en post 4")
    
    
      
      res.status(200).json({ success: "Your review was posted!" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })

  rating.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const response = await Rating.findByPk(id);
      await response.destroy();
      res.status(200).json({ success: "Review deleted!" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = rating;