const {Router} = require('express')
const router = Router();
const{Product, Brand, Category, Op, Size, Product_Size}=require("../../db/db");



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
  const { name, image, brand, price, size, category } = req.body;

  //Size = [{31,4}{35,5}{43,2}]
  category.map(async (e) => 
    await Category.findOrCreate({ where: { name: e } })
  ) 
 
  ;

  size.forEach(async (e) => await Size.findOrCreate({ where: { size: e.size } }));

  await Brand.findOrCreate({ where: { name: brand } });

  // let Sizes = size.map(e => ({size: e.size}))
  // await Size.bulkCreate(
  //   Sizes,
  //   {ignoreDuplicates:true}
  // )

  // await Category.bulkCreate(
  //   category,
  //   {ignoreDuplicates:true}
  // )

  try {
    const newProduct = await Product.create({ name, image, price });
    //Busco la marca y le asigno el id de la encontrada, para buscar la marca tendria que estar previamente en la bd.
    //Que la busque puede parecer innecesario porque si esta validado desde el front siempre la va a encontrar, porque jamas me llegaria otra marca al back
    //Pero hago la busqueda porque la tabla intermedia necesita el id de la brand y no el nombre
    //Entonces en findBrand me quedaria: (id,name) yo necesito el id
    let findBrand = await Brand.findOne({ where: { name: brand } });

    newProduct.BrandId = findBrand.id

    await newProduct.save();

    //Hago lo mismo que arriba
    let findCategories = await Category.findAll({
      attributes: ["id"],
      where: {
        name: {
          [Op.or]: category,
        },
      },
    });
    //Hacemos la relacion del producto y su categoria
    await newProduct.addCategory(findCategories);

    for (let index = 0; index < size.length; index++) {
      let findSize = await Size.findOne({ where: { size: size[index].size } });
      let stock = size[index].stock

      await newProduct.addSize(findSize.dataValues.id, { through: { stock }})

      
      //addproductSize??
    }
    

    //-------------------------------------------------------------------------
    // let findSize = await Size.findAll({
    //   attributes: ["id"],
    //   where: {
    //     name: {
    //       [Op.or]: size,
    //     },
    //   },
    // });
    //findSize=[id,id,id]
    //stock=[4,5,6]

    // Y al nuevo producto, en la tabla intermedia, le agrego el id del size(por lo mismo que explique arriba) y tambien el stock que me llega x body
    //Teniendo en cuenta que product size es:
    //{Id,product.id,size.id, stock}
    //El product.id de donde saldria?(creo que se asigna directamente xq lo estoy agregando justo al producto que cree mas arriba, q se yo)

    // await newProduct.addProductSize(findSize,stock)

    // for (let index = 0; index < findSize.length; index++) {
    //   await newProduct.addProductSize(findSize[index], stock[index]);
    // }
    res.send("Product created")
  } catch (e) {
    console.log(e)
    res.status(400).send("There was an error, please try again");
  }
  ;
});







module.exports = router