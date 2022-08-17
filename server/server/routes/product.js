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

router.post('/',async(req,res)=>{

})

module.exports = router