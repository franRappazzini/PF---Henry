import React, { useState } from 'react';
import style from './CartCard.module.css';
import { Link } from 'react-router-dom'
import { MdOutlineFavoriteBorder as F, MdOutlineAddShoppingCart as SC} from  'react-icons/md';
import { SiNike, SiAdidas, SiPuma, SiNewbalance, SiReebok } from 'react-icons/si';
import { GrClose } from "react-icons/gr";
import { IoMdClose } from "react-icons/io"
import { removeFromCart } from '../../../redux/actions/productActions.js';
import { useDispatch, useSelector } from 'react-redux';


export default function Card({product}) {
    let dispatch = useDispatch()
    let { cartProducts } = useSelector(state=> state.product)

        
  return (
        <div className={style.box}>
            <div className={style.image_container}>
            <img className={style.product_image} src={product.image} alt={product.image} />
            <div className={style.image_background}></div>
            </div>
            <div className={style.br}></div>
            <div className={style.right_container}>
                <div className={style.top_right}>
                    <button onClick={()=>dispatch(removeFromCart(product.id))} className={style.close_button}><IoMdClose className={style.close_icon}/></button>
                </div>
            <div className={style.info_container}>
                <h1 className={style.title}>{product.name}</h1>
                <span className={style.categories}>{product.Categories?product.Categories.map(e=>e.name).join(", "):""}</span>
            </div>
            <div className={style.amount_and_size}>
            <span className={style.size_span}>SIZE: {product.choosedSize}</span>
            <span className={style.amount_span}>{product.choosedAmount}</span>
            </div>
            </div>
        </div>
  )
}