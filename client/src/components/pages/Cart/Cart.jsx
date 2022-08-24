
import React, { useEffect, useState } from 'react';
import Card from '../../organisms/Card/Card.jsx'
import style from "./Cart.module.css"
import { useSelector } from 'react-redux';

export default function Cart(){
 
    let { cartProducts } = useSelector((state) => state.product) 

    console.log("mis productos del carrito: ", cartProducts)
    console.log(cartProducts[0])

      if(cartProducts.length)
      {return(
        <div className={style.cart_container}>

          <div className={style.card_container}>
            {cartProducts[0]?cartProducts.map(e=><div><Card key={e.id} product={e}/>{/* <span>{e.choosedAmount}</span><span>{e.choosedSize}</span> */}</div>):"nop"}
          </div>

          <button className={style.buy_button}>Buy</button>

        </div>
      )
      }else{
        return(
          <span>No hay productos en el carrito</span>
        )
      }
}
