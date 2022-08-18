import React, { useState } from 'react';
import style from './Card.module.css';

import { MdOutlineFavoriteBorder } from  'react-icons/md';
import { SiNike, SiAdidas, SiPuma, SiNewbalance, SiReebok } from 'react-icons/si';
import { BiError } from 'react-icons/bi';

export default function Card({product}) {
    let [fav, setFav] = useState(false)
    let handleFav = () => {
        setFav(current => !current)
    }
    
  return (
        <div className={style.container}>
            <div className={style.card}>
            <div className={style.header}>
                {product.brand==='Nike' ? <SiNike className={style.brand} size={40}/> : product.brand==='Adidas' ? <SiAdidas className={style.brand} size={40}/> : product.brand==='Puma' ? <SiPuma className={style.brand} size={40}/> : product.brand==='Reebok' ? <SiReebok className={style.brand} size={40}/> : product.brand==='New Balance' ? <SiNewbalance className={style.brand} size={40}/> : <BiError className={style.brand} size={40}/>}
                <MdOutlineFavoriteBorder className={ style.iconoutline } size={30} onClick={handleFav} style={{color: fav ? '#5f27cd' : '#000'}}/>
            </div>            
                <div className={style.product}>
                    <img src={product.image} alt= 'not found' className={style.img}/>
                </div>  
                <div className={style.info}>
                    <div className={style.title}>{product.title}</div>
                    <div className={style.price}>${product.price}</div>
                </div>
                <div className={style.details}>
                    <button>View More</button>
                </div>
            </div>        
        </div>
  )
}
