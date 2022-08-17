// eslint-disable-next-line no-unused-vars
import React from "react"
// import {useEffect} from "react"
// import {useParams/* , useState */} from "react-router-dom"
// import { getProductDetail } from "../../Redux/actions";


export default function Detail(/* {productDetail, getProductDetail} */){
    let productDetail = {name:"air max 670",id:1,image:"https://www.nike.com/es/w/hombre-zapatillas-nik1zy7ok", brand:"nike",price:80}
    let sizes = [{id:4, name:44, stock:10, color:"default"},{id:3, name:43, stock:8, color:"default"}]
    let rating = [{id:1, text:"good", star:4, UserId:6, ProductId:1},{id:1, text:"good", star:3, UserId:6, ProductId:1},{id:1, text:"good", star:1, UserId:6, ProductId:1}]
    /* let params = useParams() */
    let avaiableSizes = sizes.filter(e=> e.stock > 0)
    let arrAverage = rating.map(e=>e.star)
    let ratingAverage = arrAverage.reduce((a,b)=> a + b)/rating.length

    /* useEffect(()=>{
        getProductDetail(params.productId)
    },[]) */
    return(
        <div>
            <h1>{productDetail.name}</h1>
            <img src={productDetail.image} alt="" />
            <span>rating: {ratingAverage}</span>
            <h2>avaiable sizes: </h2>
            <div>
            {avaiableSizes.map(e=><button>{e.name}</button>)}
            </div>
        </div>
    )
  };
