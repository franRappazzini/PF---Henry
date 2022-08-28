
import React, { useEffect, useState } from 'react';
import CartCard from '../../organisms/CartCard/CartCard.jsx'
import style from "./Cart.module.css"
import { useSelector } from 'react-redux';
import NoProductsFound from '../../molecules/NoProductsFound/NoProductsFound.jsx'

export default function Cart(){
  let lsCartProducts = JSON.parse(localStorage.getItem('lsCartProducts')) || []
 
    let { cartProducts } = useSelector((state) => state.product) 

    console.log("lsCartProducts from Cart: ", lsCartProducts)      
      return(
        <div className={style.cart_container}>
          <h1 className={style.h1_cart}>MY CART</h1>
          <div className={cartProducts.length?style.card_container:style.empty_container}>
            {lsCartProducts.length?lsCartProducts.map(e=><div><CartCard key={e.id} product={e}/>{/* <span>{e.choosedAmount}</span><span>{e.choosedSize}</span> */}</div>):<NoProductsFound message="You haven't added products to the cart... yet ;)"/>}
          </div>

          <button className={style.buy_button}>BUY</button>

        </div>
      )

      

}
