import React from 'react';
import style from './PurchaseItem.module.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function PurchaseItem({ product }) {

    console.log(product)
    const itemInfo = product.Product_Sizes[0]

  return (
    
        <div >
            {product?
            <div className={style.itemContainer}>

            <div className={style.imageContainer}>
                <img src={itemInfo.productData.image} alt='not found' className={style.image}/>
            </div>
    
            <div className={style.infoContainer}>
                <div className={product.state==='Completed'?style.status:style.status2}>
                    {product.state}              
                </div>
                <div className={style.shipInfo}>
                    {product.state==='Completed'?'Delivered':'Processing'} 
                </div>
                <div className={style.name}>
                   {itemInfo.productData.name} (Size: {itemInfo.SizeId.size})
                </div>
                <div className={style.name}>
                   {itemInfo.productData.price}$
                </div>
                <div className={style.units}>
                    Amount: {itemInfo.Product_Bought.amount}
                </div>
            </div>
    
            <div className={style.buttonContainer}>
                <Link to={`/product/${itemInfo.productData.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>Purchase Again</Button>
                </Link>
            </div>    
        </div>
            :<h1>Loading</h1>
        }
        </div>
       

    
        
        
 
    
    
    
  )
}
