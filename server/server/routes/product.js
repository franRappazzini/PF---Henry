const { Router } = require("express");
const router = Router();
const {
  Product,
  Brand,
  Category,
  Rating,
  Op,
  Size,
  Product_Size,
  Product_Category,
} = require("../../db/db");

router.get("", async (req, res) => {
  const { name, category, brand, size, by, order } = req.query;

  try {
    let response = [];
    const options = {
      where: { [Op.and]: [] },
      include: [
        { model: Brand },
        { model: Rating },
        { model: Size },
        { model: Category },
      ],
    };

    if (category) {
      options.where = {
        [Op.and]: [...options.where[Op.and], { "$Categories.name$": category }],
      };
    }
    if (brand) {
      options.where = {
        [Op.and]: [...options.where[Op.and], { "$Brand.name$": brand }],
      };
    }
    if (size) {
      options.where = {
        [Op.and]: [...options.where[Op.and], { "$Sizes.size$": size }],
      };
    }
    if (by && order) options.order = [[by, order]];

    if (name) {
      response = await Product.findAll({
        ...options,
        where: {
          [Op.and]: [...options.where[Op.and]],
          name: { [Op.iLike]: `%${name}%` },
        },
      });
    } 
    else {
      response = await Product.findAll(options);
    }

    res.json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }

  // const allProducts = await Product.findAll({
  //   include: [
  //     { model: Brand },
  //     { model: Rating },
  //     { model: Size },
  //     { model: Category },
  //   ],
  // });
  // if (name) {
  //   try {
  //     let findByName = await allProducts.filter((p) =>
  //       p.name.toLowerCase().includes(name.toLowerCase())
  //     );
  //     findByName.length
  //       ? res.status(200).send(findByName)
  //       : res.status(404).send("Not found");
  //   } catch (error) {
  //     res.status(400).send("Problem");
  //   }
  // } else {
  //   res.status(200).send(allProducts);
  // }
});

router.put("/:id",async(req,res,next)=>{
  const {id}=req.params
  const { name,image,price,stock,brandId } = req.body
  try {
  const options = {}
   const data = await Product.findByPk(id)
  console.log(data)
    if(name){
      console.log(name)
       options.name=name
       console.log(data.name)
       console.log(data.name)
    }
    if(image){
      console.log(image)
      options.image=image
    }
    if(price){
      console.log(price)
      options.price=price
    }
    if(stock){
      console.log(stock)
      options.stock=stock
    }
    if(brandId){
      console.log(stock)
      options.brandId=brandId
    }
    await data.update(options)
    res.json(data);
  }catch (error) {
    res.status(400).send("Error")
  }
})


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findByPk(id, {
      include: [
        { model: Brand },
        { model: Rating },
        { model: Size },
        { model: Category },
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

router.post("", async (req, res) => {
  const { name, image, brand, price, size, category } = req.body;

  //Size = [{31,4}{35,5}{43,2}]
  category.map(
    async (e) => await Category.findOrCreate({ where: { name: e } })
  );

  size.forEach(
    async (e) => await Size.findOrCreate({ where: { size: e.size } })
  );

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

    newProduct.BrandId = findBrand.id;

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
      let stock = size[index].stock;

      await newProduct.addSize(findSize.dataValues.id, { through: { stock } });

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
    res.status(200).json(newProduct);
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error, please try again");
  }
});

// ESTA ES PARA CREAR TODOS DE UNA
// router.post("/", async (req, res) => {
//   // const { name, image, brand, price, size, category } = req.body;

//   //Busco o creo: Marca,size y category
//   for (let index = 0; index < req.body.length; index++) {
//     const name = req.body[index].name;
//     const image = req.body[index].image;
//     const price = req.body[index].price;
//     const brand = req.body[index].brand;
//     const category = req.body[index].category;
//     const size = req.body[index].size;
//     category.map(
//       async (e) => await Category.findOrCreate({ where: { name: e } })
//     );
//     size.forEach(
//       async (e) => await Size.findOrCreate({ where: { size: e.size } })
//     );
//     await Brand.findOrCreate({ where: { name: brand } });

//     //Creo el producto y hago las relaciones

//     try {
//       const newProduct = await Product.create({ name, image, price });
//       let findBrand = await Brand.findOne({ where: { name: brand } });
//       newProduct.BrandId = findBrand.id;
//       await newProduct.save();
//       let findCategories = await Category.findAll({
//         attributes: ["id"],
//         where: {
//           name: {
//             [Op.or]: category,
//           },
//         },
//       });
//       await newProduct.addCategory(findCategories);

//       for (let index = 0; index < size.length; index++) {
//         let findSize = await Size.findOne({
//           where: { size: size[index].size },
//         });
//         let stock = size[index].stock;
//         await newProduct.addSize(findSize.dataValues.id, {
//           through: { stock },
//         });
//       }
//     } catch (e) {
//       console.log(e);
//       res.status(400).send("There was an error, please try again");
//     }
//   }
//   res.status(200).send("Product created");
// });



module.exports = router;
