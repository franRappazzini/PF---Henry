// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from "react-redux"
import style from "./ProductContainer.module.css"
import { SiNike } from 'react-icons/si';
import { SiAdidas } from 'react-icons/si'
import { SiPuma } from 'react-icons/si'
import { SiReebok } from 'react-icons/si'
import { SiNewbalance } from 'react-icons/si'
import { BiError } from 'react-icons/bi'
import { FaHeart } from "react-icons/fa"
import { FaCartPlus } from "react-icons/fa"
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";

import { Rating } from "@mui/material"
import { useState } from "react";
import { addFavorites, removeFavorites, addToCart, removeFromCart } from "../../../redux/actions/productActions"


// import {useEffect} from "react"
// import {useParams/* , useState */} from "react-router-dom"
// import { getProductDetail } from "../../Redux/actions";


export default function ProductContainer({productDetail}){


  let amountInput = "";
  if(document.getElementById("amount")){
    amountInput = document.getElementById("amount")
  }


  const dispatch = useDispatch()
    
    const [amount, setAmount] = useState(amountInput!==""&&amountInput.textContent?amountInput.textContent:1)
    const [selectedSize, setSelectedSize] = useState(0)
    const { favorites, cartProducts } = useSelector(state=> state.product)
     const checkFaved = () => {
      return favorites.filter(fav=>fav.id===productDetail.id).length
   }
   const [fav, setFav] = useState(false)
   const isCart = cartProducts.filter(e=> `${productDetail.name}-${selectedSize}-${amount}`===e.cartId).length
   const [cart, setCart] = useState(false)
   let ls = JSON.parse(localStorage.getItem('lsFavorites')) || []
  
   let lsCart = JSON.parse(localStorage.getItem('lsCartProducts')) || []
   console.log('ls details START!!!!!!!!!!!', lsCart);
   
   useEffect(()=>{
    setCart(isCart?true:false)
    setFav(checkFaved()?true:false)
   },[isCart,checkFaved])
  //  console.log("setCart: ", cart)



  //  console.log("My real amount: ", amount)
  //  console.log("My real size: ", selectedSize)
   let mySize = ""
    selectedSize!==0?mySize = productDetail.Sizes.filter(e=>e.size===selectedSize):mySize="" 
   let stock = 0
   mySize[0]?stock = mySize[0].Product_Size.stock:stock=0
   /* console.log(productDetail.Sizes.filter(e=>e.size===39))
   console.log("my stock: ",stock) */

    const sizes = productDetail.Sizes.map(e=>e.size)

    // PRUEBA DE RAITING
    let rating = [{id:1, text:"good", star:3.5, UserId:6, ProductId:1},{id:1, text:"good", star:3, UserId:6, ProductId:1},{id:1, text:"good", star:1, UserId:6, ProductId:1}]
    // PRUEBA DE RATING
    
    const MySwal = withReactContent(Swal)
    let filteredSizes = []
    for (let i = 0; i < sizes.length; i++) {
      if(!filteredSizes.includes(sizes[i]) && productDetail.Sizes[i].Product_Size.stock > 0){
        filteredSizes.push(sizes[i])
      }
    }
    filteredSizes = filteredSizes.sort(function(a, b) {
      return a - b;
    });
    let arrAverage = rating.map(e=>e.star)
    let ratingAverage = arrAverage.reduce((a,b)=> a + b)/rating.length
    

    const handleFav = (e) =>{
     /*  console.log("EN EL HANDLE FAV") */
      e.preventDefault()
      if(fav){
        dispatch(removeFavorites(productDetail.id))
        ls=ls.filter(prod=>prod.id!==productDetail.id)
        localStorage.setItem('lsFavorites', JSON.stringify(ls))
        setFav(false)
      }else{
        dispatch(addFavorites(productDetail))
        ls.push(productDetail)
        localStorage.setItem('lsFavorites', JSON.stringify(ls))
        setFav(true)
      }
    }
    const handleCart = (e) => {
      let prodToCart = {
        cartId:`${productDetail.name}-${selectedSize}-${amount}`,
        id:productDetail.id,
        Brand:productDetail.Brand,
        Categories:productDetail.Categories,
        image:productDetail.image,
        name:productDetail.name,
        price: productDetail.price,
        choosedSize:selectedSize,
        choosedAmount:amount,
        Sizes:productDetail.Sizes
      }
      e.preventDefault()
      if(cart){
        setCart(false)
        dispatch(removeFromCart(`${productDetail.name}-${selectedSize}-${amount}`))
        lsCart = lsCart.filter(prod=>prod.id!==productDetail.id)
        localStorage.setItem('lsCartProducts', JSON.stringify(lsCart))
        setSelectedSize(0)
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          ProgressBarColor: "white",
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'The product was removed from the cart',
          background: "#c70000",
          color: "white",
          textAlign: "center"
        })
      }else{
        setCart(true)
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          ProgressBarColor: "white",
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'The product was added to the cart successfully!',
          background: "#5f27cd",
          color: "white",
          
        })
        
       
        console.log('prodDetails from details',productDetail)

        dispatch(addToCart(prodToCart))        
        lsCart.push(prodToCart)
        console.log('localStorage from details:', lsCart);
        localStorage.setItem('lsCartProducts',JSON.stringify(lsCart))
        console.log('localStorage from details after set:', lsCart);
        
        
    }
      
    }
    
  
    const handleError = (e) =>{
      e.preventDefault()
      MySwal.fire({
        title: <p>You have to select almost one size</p>,
        confirmButton: false,
        backdrop: `
    rgba(12,12,12,0.4)
  `,
        icon: false,
      });
    } 
    
    if(productDetail){
    return(
      
        <div className={style.product_container}> 
        
          <div className={style.left_side}>  
            <div className={style.top_left_container}>
            {productDetail.Brand.name==='Nike' ? <SiNike className={style.brand_icon} size={40}/> : productDetail.Brand.name==='Adidas' ? <SiAdidas className={style.brand_icon} size={40}/> : productDetail.Brand.name==='Puma' ? <SiPuma className={style.brand_icon} size={40}/> : productDetail.Brand.name==='Reebok' ? <SiReebok className={style.brand_icon} size={40}/> : productDetail.Brand.name==='New Balance' ? <SiNewbalance className={style.brand_icon} size={40}/> : <BiError className={style.brand_icon} size={40}/>}
              <button onClick={(e)=>{handleFav(e)}} className={style.heart_button}><FaHeart className={!fav?style.heart_icon1:style.heart_icon2} /></button>
            </div>
            
            <img className={style.product_img} src={productDetail.image} alt="" />
          </div>

          <div className={style.right_side}>
         
          <h1 className={style.title}>{productDetail.name}</h1>
          <div className={style.br1}></div>
          <span><Rating className={style.rating} name="read-only" value={ratingAverage} readOnly /></span>
          <div className={style.br2}></div>
          <div className={style.category_container}>{productDetail.Categories.map(c=>c.name).join(", ")}</div>
          <div className={style.br2}></div>
          <h2 className={style.available_h2}>AVAILABLE SIZES</h2>
          <div className={style.size_buttons_container}>
            {filteredSizes.map(e=><button onClick={selectedSize===e?()=>{setSelectedSize(0)}:()=>{setSelectedSize(e)}} className={selectedSize!==e?style.size_button:style.selected_button} key = {e}>{e}</button>)}
            <div className={style.amount_container}>
            {selectedSize!==0?<div className={style.amount_box}><span>AMOUNT: </span><div className={style.input_container}><button onClick={()=>{amount===1?setAmount(1):setAmount(amount-1)}} className={style.in_dec_button}><IoMdArrowDropleft className={style.in_dec_icon}/></button><span id="amount" className={style.amount_span}>{amount}</span><button onClick={()=>{stock===amount?setAmount(stock):setAmount(amount+1)}} className={style.in_dec_button}><IoMdArrowDropright className={style.in_dec_icon}/></button></div></div>:""}
            </div>
            </div>
            <div className={style.br3}></div>
            <div className={style.price_container}><span className={style.price}>{productDetail.price}$</span>  <button onClick={selectedSize===0||!amount?(e)=>handleError(e):(e)=>{handleCart(e)}} className={!cart?style.shopping_button:style.shopping_button2}>{!cart?<FaCartPlus className={style.shopping_icon1}/>:<FaShoppingCart className={style.shopping_icon2}/> }</button></div>
          </div>
        </div>
    )
  }
  }