import React, { useState } from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom'
import { MdOutlineFavoriteBorder as F } from  'react-icons/md';
import { SiNike, SiAdidas, SiPuma, SiNewbalance, SiReebok } from 'react-icons/si';
import { BiError } from 'react-icons/bi';
import { addFavorites, removeFavorites} from '../../../redux/actions/productActions.js';
import { useDispatch, useSelector } from 'react-redux';

export default function Card({product}) {
    let { favorites } = useSelector((state) => state.product)
    let dispatch = useDispatch()
    let checkFaved = () => {
       return favorites.filter(fav=>fav.id===product.id).length
    }

    let [fav, setFav] = useState(checkFaved()?true:false)

    let handleFav = () => {        
        fav ? dispatch(removeFavorites(product.id)) : dispatch(addFavorites(product))
        setFav(current => !current)      
    }
        
  return (
        <div className={style.container}>
            <div className={style.card}>
            <div className={style.header}>
                {
                product.Brand.name==='Nike' 
                ? <SiNike className={style.brand}/> 
                : product.Brand.name==='Adidas' 
                ? <SiAdidas className={style.brand}/> 
                : product.Brand.name==='Puma' 
                ? <SiPuma className={style.brand}/> 
                : product.Brand.name==='Reebok' 
                ? <SiReebok className={style.brand}/> 
                : product.Brand.name==='New Balance' 
                ? <SiNewbalance className={style.brand}/> 
                : <BiError className={style.brand}/>
                }
                <F className={style.iconoutline} onClick={handleFav} style={{color: fav ? '#5f27cd' : '#000'}}/>
            </div>            
                <div className={style.product}>
                    <img src={product.image} alt= 'not found' className={product.Brand.name==='Reebok'? style.img2 : style.img}/>
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