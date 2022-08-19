
import style from "./Details.module.css"
import ProductContainer from "../../organisms/ProductContainerDetail/ProductContainer";
import ReviewContainer from "../../organisms/ReviewContainerDetail/ReviewContainer";
import {useSelector, useDispatch} from "react-redux"
import {useEffect} from "react"
import {useParams, useState} from "react-router-dom"
import {getProduct } from "../../../redux/actions/productActions.js";



export default function Detail(){
  
    const {productId} = useParams()
    const {productDetail} = useSelector(state => state.product)
    const dispatch = useDispatch()
    console.log("hola hola",productDetail)
    console.log(productId)
    useEffect(()=>{
      console.log("en el use")
        dispatch(getProduct(productId))
    },[dispatch, productId])

    if(productDetail.hasOwnProperty("name")){
    return(
      <div className={style.box}>


        <ProductContainer productDetail={productDetail}/>


        <ReviewContainer />


        </div>
    )
  }else{
    return(
      <span>no hay product Detail</span>
    )
  }
}

