const {Router} = requier('express')
const router=Router();
const{Product}=require("../../db/models/Product")



router.get('/',async (req,res)=>{
    try {
        const allProducts=await Product.findAll({
            include:{   
                // model: Category,
                // attributes: {
                //   include: ['name'], 
                //   exclude:['createdAt', 'updatedAt']
                // },
                // through: {
                //   attributes:[]
                // }
            }
        })
        res.status(200).send(allProducts)
    } catch (error) {
        res.status(400).send("Problem")
    }
   

    
})

router.get('/:id', async (req,res)=>{
    try {
        const {id} = req.params
      const data = await Product.findByPk(id,{
        // Category,Rating,Size
        include: {
            model: Category,
            attributes:{
                include:['name']
            },
            model: Rating,
            attributes:{
                include: ['text','star']
            },
            model: Size,
            attributes:{
                include: ['name', 'stock','color']
            }
        }                       
      })
        
      if (data) {
        res.json(data)
      }
      else{
        res.json('id of product not found, please write id valid')
      }
   
     } catch (error) {
    res.status(404).json(error)
}


})


router.post('/',async(req,res)=>{

})

