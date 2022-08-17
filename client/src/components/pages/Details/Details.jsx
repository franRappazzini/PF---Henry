// eslint-disable-next-line no-unused-vars
import React from "react"
import style from "./Details.module.css"
import { SiNike } from 'react-icons/si';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { Rating } from "@mui/material"
// import {useEffect} from "react"
// import {useParams/* , useState */} from "react-router-dom"
// import { getProductDetail } from "../../Redux/actions";


export default function Detail(/* {productDetail, getProductDetail} */){
    let productDetail = {name:"air max 670",id:1,image:"https://www.nike.com/es/w/hombre-zapatillas-nik1zy7ok", brand:"nike",price:80}
    let sizes = [{id:4, name:34, stock:10, color:"default"},{id:4, name:35, stock:10, color:"default"},{id:4, name:36, stock:10, color:"default"},{id:4, name:37, stock:10, color:"default"},{id:4, name:38, stock:10, color:"default"},{id:4, name:39, stock:10, color:"default"},{id:4, name:40, stock:10, color:"default"},{id:4, name:41, stock:10, color:"default"},{id:4, name:42, stock:10, color:"default"},{id:3, name:43, stock:8, color:"default"}]
    let rating = [{id:1, text:"good", star:3.5, UserId:6, ProductId:1},{id:1, text:"good", star:3, UserId:6, ProductId:1},{id:1, text:"good", star:1, UserId:6, ProductId:1}]
    /* let params = useParams() */
    let avaiableSizes = sizes.filter(e=> e.stock > 0)
    let arrAverage = rating.map(e=>e.star)
    let ratingAverage = arrAverage.reduce((a,b)=> a + b)/rating.length

    /* useEffect(()=>{
        getProductDetail(params.productId)
    },[]) */
    return(
      <div className={style.box}>


        <div className={style.product_container}>
          <div className={style.left_side}>
            <div className={style.top_left_container}>
          <SiNike className={style.brand_icon}/>
          <button className={style.shopping_button}>+<RiShoppingCart2Fill className={style.shopping_icon}/> </button>
            </div>
            <img className={style.product_img} src="https://cdn.discordapp.com/attachments/1006652104124928093/1009469375406936127/Nike_air_max_270.png" alt="" />
          <div className={style.img_container}>
          <img src={productDetail.image} alt="" />
          </div>
          </div>

          <div className={style.right_side}>
          <h1 className={style.title}>{productDetail.name.toUpperCase()}</h1>
          <div className={style.br1}></div>
          <span><Rating name="read-only" value={ratingAverage} readOnly /></span>
          <div className={style.br2}></div>
          <h2 className={style.available_h2}>AVAILABLE SIZES</h2>
          <div className={style.size_buttons_container}>
            {avaiableSizes.map(e=><button className={style.size_button}>{e.name}</button>)}
            </div>
            <div className={style.br2}></div>
            <span className={style.price}>{productDetail.price}$</span>
          </div>
        </div>


        <div className={style.review_container}>
          <h1 className={style.review_title}>REVIEWS</h1>
          <div className={style.reviews}>
            
          </div>
          <form className={style.review_form}>
            <textarea placeholder="Write your own review..." className={style.textarea} name="review" id="review" cols="30" rows="10"></textarea>
            <button className={style.review_submit_button} type="submit">SEND</button>
          </form>
        </div>


        </div>
    )
  };

