const {Router} = require('express')
const router = Router();
const{Product}=require("../../db/models/Product")
const {Brand}=require("../../db/models/Brand")
const {Category}=require("../../db/models/Category")
const {productSize}=require("../../db/models/Product_Size")



router.get("/", async (req, res) => {
  const { name } = req.query;
  const allProducts = await Product.findAll({
    include: [
      {
        model: Category,
        attributes: {
          include: ["name"],
          exclude: ["createdAt", "updatedAt"],
        },
        // through: {
        //   attributes:[]
        // },
        model: Brand,
        attributes: {
          include: ["name"],
        },
      },
    ],
  });
  if (name) {
    try {
      let findByName = await allProducts.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );
      findByName.length
        ? res.status(200).send(findByName)
        : res.status(404).send("Not found");
    } catch (error) {
      res.status(400).send("Problem");
    }
  } else {
    res.status(200).send(allProducts);
  }
});



router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findByPk(id, {
      include: [
        {
          //     model: Category,
          //     attributes:
          //        ['name']
          // },
          // {
          //     model: Rating,
          //     attributes:
          //        ['text','star']
          // },
          // {
          //     model: Size,
          //     attributes:['name', 'stock','color']},
          // {
          //     model: Brand,
          //     attributes:
          //         ['name']
        },
      ],
    });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("id of product not found");
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/", async (req, res) => {
  const { name, images, brand, price, productSize, category } = req.body;
  try {
    newProduct = await Product.create({ name, images, price });

    //Busco la marca y le asigno el id de la encontrada
    let findBrand = await Brand.findOne({ where: { name: brand } });
    newProduct.addBrand(findBrand.id);
  } catch (e) {
    res.status(400).send("There was an error, please try again");
  }
  res.send("Product created");
});

module.exports = router