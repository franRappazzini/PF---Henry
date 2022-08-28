
import style from "./Details.module.css"
import ProductContainer from "../../organisms/ProductContainerDetail/ProductContainer";
import ReviewContainer from "../../organisms/ReviewContainerDetail/ReviewContainer";
import CarouselContainer from "../../organisms/CarouselContainerDetail/CarouselContainer"
import {useSelector, useDispatch} from "react-redux"
import {useEffect} from "react"
import {useParams, useState} from "react-router-dom"
import {getProduct } from "../../../redux/actions/productActions.js";
import CarouselTitle from "../../molecules/CarouselTitleDetails/CarouselTitle";
import NoProductsFound from "../../molecules/NoProductsFound/NoProductsFound";




export default function Detail(){
  
    const {productId} = useParams()
    const {productDetail, products} = useSelector(state => state.product)
    const dispatch = useDispatch()
  
  
    useEffect(()=>{
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
      <NoProductsFound message='theres no product Detail'/>
    )
  }
}

