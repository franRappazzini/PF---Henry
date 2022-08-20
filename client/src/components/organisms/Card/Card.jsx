import React, { useState } from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';
import { MdOutlineFavoriteBorder } from  'react-icons/md';
import { SiNike, SiAdidas, SiPuma, SiNewbalance, SiReebok } from 'react-icons/si';
import { BiError } from 'react-icons/bi';

export default function Card({product}) {
    let [fav, setFav] = useState(false)
    let handleFav = () => {
        setFav(current => !current)
    }
    console.log('Product from Home:', product);
    
  return (
        <div className={style.container}>
            <div className={style.card}>
            <div className={style.header}>
                {product.Brand.name==='Nike' ? <SiNike className={style.brand}/> : product.Brand.name==='Adidas' ? <SiAdidas className={style.brand} /> : product.Brand.name==='Puma' ? <SiPuma className={style.brand} /> : product.Brand.name==='Reebok' ? <SiReebok className={style.brand} /> : product.Brand.name==='New Balance' ? <SiNewbalance className={style.brand} /> : <BiError className={style.brand} />}
                <MdOutlineFavoriteBorder className={ style.iconoutline } onClick={handleFav} style={{color: fav ? '#5f27cd' : '#000'}}/>
            </div>            
                <div className={style.product}>
                    <img src={product.image} alt= 'not found' className={product.Brand.name==='Reebok'?style.img2:style.img}/>
                </div>  
                <div className={style.info}>
                    <div className={style.title}>{product.name}</div>
                    <div className={style.price}>${product.price}</div>
                </div>
                <Link to={`/product/${product.id}`}>
                    <div className={style.details}>
                        <button>View More</button>
                    </div>
                </Link>
            </div>        
        </div>
  )
}
