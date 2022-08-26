
import React, { useEffect, useState } from 'react';
import CartCard from '../../organisms/CartCard/CartCard.jsx'
import style from "./Cart.module.css"
import { useSelector } from 'react-redux';
import NoProductsFound from '../../molecules/NoProductsFound/NoProductsFound.jsx'

export default function Cart(){
 
    let { cartProducts } = useSelector((state) => state.product) 

    console.log("mis productos del carrito: ", cartProducts)
    console.log(cartProducts[0])

      
      return(
        <div className={style.cart_container}>
          <h1 className={style.h1_cart}>MY CART</h1>
          <div className={cartProducts.length?style.card_container:style.empty_container}>
            {cartProducts[0]?cartProducts.map(e=><div><CartCard key={e.id} product={e}/>{/* <span>{e.choosedAmount}</span><span>{e.choosedSize}</span> */}</div>):<span className={style.empty_span}>You haven't added products to the cart... yet ;)</span>}
          </div>

          <button className={style.buy_button}>BUY</button>

        </div>
      )

      

}
