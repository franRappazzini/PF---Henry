const {Router} = require('express')
const router = Router();
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
       
        include: [{
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
            
        }
    ]                       
      })
        
      if (data) {
        res.json(data)
      }
      else{
        res.status(404).send('id of product not found')
      }
   
     } catch (error) {
    res.status(404).json(error)
}


})

router.post('/',async(req,res)=>{

})

module.exports = router