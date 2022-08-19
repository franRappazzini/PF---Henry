// eslint-disable-next-line no-unused-vars
import React from "react"

import style from "./ProductContainer.module.css"
import { SiNike } from 'react-icons/si';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { Rating } from "@mui/material"
import { useState } from "react";

// import {useEffect} from "react"
// import {useParams/* , useState */} from "react-router-dom"
// import { getProductDetail } from "../../Redux/actions";


export default function ProductContainer({productDetail}){

    const [cart, setCart] = useState(false)
    const [selectedSize, setSelectedSize] = useState(0)
    let sizes = [{id:4, name:34, stock:10, color:"default"},{id:4, name:35, stock:10, color:"default"},{id:4, name:36, stock:10, color:"default"},{id:4, name:37, stock:10, color:"default"},{id:4, name:38, stock:10, color:"default"},{id:4, name:39, stock:10, color:"default"},{id:4, name:40, stock:10, color:"default"},{id:4, name:41, stock:10, color:"default"},{id:4, name:42, stock:10, color:"default"},{id:3, name:43, stock:8, color:"default"}]
    let rating = [{id:1, text:"good", star:3.5, UserId:6, ProductId:1},{id:1, text:"good", star:3, UserId:6, ProductId:1},{id:1, text:"good", star:1, UserId:6, ProductId:1}]
    /* let params = useParams() */

    let avaiableSizes = sizes.filter(e=> e.stock > 0)
    let arrAverage = rating.map(e=>e.star)
    let ratingAverage = arrAverage.reduce((a,b)=> a + b)/rating.length
  
    /* useEffect(()=>{
        getProductDetail(params.productId)
    },[]) */
    if(productDetail){
    return(
        <div className={style.product_container}> 
          <div className={style.left_side}>  
            <div className={style.top_left_container}>
          <SiNike className={style.brand_icon}/>
          <button className={style.shopping_button}>+<RiShoppingCart2Fill className={style.shopping_icon}/> </button>
            </div>
            <img className={style.product_img} src={productDetail.image} alt="" />
          </div>

          <div className={style.right_side}>
          <h1 className={style.title}>{productDetail.name}</h1>
          <div className={style.br1}></div>
          <span><Rating name="read-only" value={ratingAverage} readOnly /></span>
          <div className={style.br2}></div>
          <h2 className={style.available_h2}>AVAILABLE SIZES</h2>
          <div className={style.size_buttons_container}>
            {avaiableSizes.map(e=><button onClick={setSelectedSize} className={style.size_button}>{e.name}</button>)}
            </div>
            <div className={style.br2}></div>
            <span className={style.price}>{productDetail.price}$</span>
          </div>
        </div>
    )
  };
  }