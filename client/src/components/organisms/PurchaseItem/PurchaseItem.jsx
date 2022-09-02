import React from 'react'
import style from './PurchaseItem.module.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';




export default function PurchaseItem(items) {
    // name,image,price,choosedAmount,brand,choosedSize
    let date = new Date().toDateString()

    console.log("item")
    console.log(items.items[0].choosedSize)
  
  return (
    
        <div >
            {items?
            <div className={style.itemContainer}>

            <div className={style.imageContainer}>
                <img src={items.items[0].image} alt="not found" className={style.image}/>
            </div>
    
            <div className={style.infoContainer}>
                {/* <div className={style.status}>
                    {order.status}               
                </div> */}
                <div className={style.shipInfo}>
                    Delivered {date}
                </div>
                <div className={style.name}>
                   {items.items[0].name}
                </div>
                <div className={style.units}>
                    {items.items[0].choosedAmount}
                </div>
                  <div className={style.name}>
                   {items.items[0].Brand.name}
                </div> 
                <div className={style.name}>
                   {items.items[0].price}
                </div>
                <div className={style.name}>
                   {items.items[0].choosedSize.size}
                </div>  
            </div>
    
            <div className={style.buttonContainer}>
                <Link to='/product/a3b27646-5e6d-471b-812e-b6fb0c74cc8e' style={{ textDecoration: 'none' }}>
                    <Button variant="contained">Purchase Again</Button>
                </Link>
            </div>
    
        </div>
            :<h1>Loading</h1>
        }
        </div>
       

    
        
        
 
    
    
    
  )
}
