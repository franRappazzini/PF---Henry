import React from 'react';
import style from './PurchaseItem.module.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function PurchaseItem({ product }) {

    let date = new Date().toDateString()

    product.status='In Progress'  

  return (
    
        <div >
            {product?
            <div className={style.itemContainer}>

            <div className={style.imageContainer}>
                <img src={product.image} alt='not found' className={style.image}/>
            </div>
    
            <div className={style.infoContainer}>
                <div className={product.status==='Delivered'?style.status:style.status2}> {/*Provisory status*/}
                    {product.status}              
                </div>
                <div className={style.shipInfo}>
                    Delivered {date}
                </div>
                <div className={style.name}>
                   {product.name} (Size: {product.choosedSize})
                </div>
                <div className={style.name}>
                   {product.price}$
                </div>
                <div className={style.units}>
                    {product.choosedAmount}u.
                </div>
            </div>
    
            <div className={style.buttonContainer}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>Purchase Again</Button>
                </Link>
            </div>    
        </div>
            :<h1>Loading</h1>
        }
        </div>
       

    
        
        
 
    
    
    
  )
}
