import React from 'react'
import style from './PurchaseItem.module.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function PurchaseItem() {
  return (
    <div className={style.itemContainer}>

        <div className={style.imageContainer}>
            <img src="https://res.cloudinary.com/dyqkwf3z6/image/upload/v1660767199/Adidas/Running/Adidas_Runfalcon_f9qljb.png" alt="not found" className={style.image}/>
        </div>

        <div className={style.infoContainer}>
            <div className={style.status}>
                Delivered                
            </div>
            <div className={style.shipInfo}>
                Delivered on july 5
            </div>
            <div className={style.name}>
                Adidas Runfalcon
            </div>
            <div className={style.units}>
                1 u.
            </div>
        </div>

        <div className={style.buttonContainer}>
            <Link to='/product/a3b27646-5e6d-471b-812e-b6fb0c74cc8e' style={{ textDecoration: 'none' }}>
                <Button variant="contained">Purchase Again</Button>
            </Link>
        </div>

    </div>
  )
}
