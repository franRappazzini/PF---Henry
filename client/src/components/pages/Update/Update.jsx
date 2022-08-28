

import {useSelector, useDispatch} from "react-redux"
import {useEffect} from "react"
import {useParams, useState} from "react-router-dom"
import {getProduct } from "../../../redux/actions/productActions.js";
import CarouselTitle from "../../molecules/CarouselTitleDetails/CarouselTitle";
import FormUpdate from "../../organisms/FormUpdateProduct/FormUpdateProduct"
import style from "./Update.module.css"



export default function Update(){
  
    const {productId} = useParams()
    const {productDetail, products} = useSelector(state => state.product)
    const dispatch = useDispatch()
  
  
    useEffect(()=>{
        dispatch(getProduct(productId))
    },[dispatch, productId])

    if(productDetail.hasOwnProperty("name")){
    return(
      <div className={style.box}>

        <FormUpdate productDetail={productDetail}/>




        </div>
    )
  }else{
    return(
      <span>theres no product Detail</span>
    )
  }
}