// eslint-disable-next-line no-unused-vars
import React from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import style from "./ProductContainer.module.css"
import { SiNike } from 'react-icons/si';
import { SiAdidas } from 'react-icons/si'
import { SiPuma } from 'react-icons/si'
import { SiReebok } from 'react-icons/si'
import { SiNewbalance } from 'react-icons/si'
import { BiError } from 'react-icons/bi'
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { Rating } from "@mui/material"
import { useState } from "react";

// import {useEffect} from "react"
// import {useParams/* , useState */} from "react-router-dom"
// import { getProductDetail } from "../../Redux/actions";


export default function ProductContainer({productDetail}){

    const [cart, setCart] = useState(false)
    const [selectedSize, setSelectedSize] = useState(0)
    const sizes = productDetail.Sizes.map(e=>e.size)
    // PRUEBA DE RAITING
    let rating = [{id:1, text:"good", star:3.5, UserId:6, ProductId:1},{id:1, text:"good", star:3, UserId:6, ProductId:1},{id:1, text:"good", star:1, UserId:6, ProductId:1}]
    // PRUEBA DE RATING
    const MySwal = withReactContent(Swal)
    let filteredSizes = []
    for (let i = 0; i < sizes.length; i++) {
      if(!filteredSizes.includes(sizes[i])){
        filteredSizes.push(sizes[i])
      }
    }
    let arrAverage = rating.map(e=>e.star)
    let ratingAverage = arrAverage.reduce((a,b)=> a + b)/rating.length
    console.log("mi cart state: ",cart)
    console.log("mi cart state: ",selectedSize)
    const handleCart = (e) => {
      e.preventDefault()
      MySwal.fire({
        title: <p>The product was added to the cart successfully!</p>,
        customClass: {
          confirmButton: "btn-success",
        },
        confirmButtonColor: '#5f27cd',
        backdrop: `
    rgba(12,12,12,0.4)
  `,
        icon: "success",
      });
      if(cart){
        setCart(false)
      }else{
        setCart(true)
      }
    }
  
    /* useEffect(()=>{
        getProductDetail(params.productId)
    },[]) */
    if(productDetail){
    return(
      
        <div className={style.product_container}> 
        
          <div className={style.left_side}>  
            <div className={style.top_left_container}>
            {productDetail.Brand.name==='Nike' ? <SiNike className={style.brand_icon} size={40}/> : productDetail.Brand.name==='Adidas' ? <SiAdidas className={style.brand_icon} size={40}/> : productDetail.Brand.name==='Puma' ? <SiPuma className={style.brand_icon} size={40}/> : productDetail.Brand.name==='Reebok' ? <SiReebok className={style.brand_icon} size={40}/> : productDetail.Brand.name==='New Balance' ? <SiNewbalance className={style.brand_icon} size={40}/> : <BiError className={style.brand_icon} size={40}/>}
          <button onClick={(e)=>handleCart(e)} className={!cart?style.shopping_button:style.shopping_button2}>+<RiShoppingCart2Fill className={!cart?style.shopping_icon:style.shopping_icon2}/> </button>
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
            {filteredSizes.map(e=><button onClick={()=>setSelectedSize(e)} className={style.size_button}>{e}</button>)}
            </div>
            <div className={style.br2}></div>
            <span className={style.price}>{productDetail.price}$</span>
          </div>
        </div>
    )
  };
  }