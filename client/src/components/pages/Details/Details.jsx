
import style from "./Details.module.css"
import ProductContainer from "../../organisms/ProductContainerDetail/ProductContainer";
import ReviewContainer from "../../organisms/ReviewContainerDetail/ReviewContainer";
import CarouselContainer from "../../organisms/CarouselContainerDetail/CarouselContainer"
import {useSelector, useDispatch} from "react-redux"
import {useEffect} from "react"
import {useParams, useState} from "react-router-dom"
import {getProduct } from "../../../redux/actions/productActions.js";
import CarouselTitle from "../../molecules/CarouselTitleDetails/CarouselTitle";




export default function Detail(){
  
    const {productId} = useParams()
    const {productDetail, products} = useSelector(state => state.product)
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

        <CarouselTitle/>


        <CarouselContainer productDetail={productDetail} products={products}/>


        <ReviewContainer />


        </div>
    )
  }else{
    return(
      <span>theres no product Detail</span>
    )
  }
}

