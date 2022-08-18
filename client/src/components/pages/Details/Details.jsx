// eslint-disable-next-line no-unused-vars
import React from "react"

import style from "./Details.module.css"
import ProductContainer from "../../organisms/ProductContainerDetail/ProductContainer";
import ReviewContainer from "../../organisms/ReviewContainerDetail/ReviewContainer";

// import {useEffect} from "react"
// import {useParams/* , useState */} from "react-router-dom"
// import { getProductDetail } from "../../Redux/actions";


export default function Detail(/* {productDetail, getProductDetail} */){
   


    /* let params = useParams() */

    
   
    /* useEffect(()=>{
        getProductDetail(params.productId)
    },[]) */
    return(
      <div className={style.box}>


        <ProductContainer/>


        <ReviewContainer/>


        </div>
    )
  };

