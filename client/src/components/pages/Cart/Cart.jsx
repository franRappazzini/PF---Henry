
import React, { useEffect, useState } from 'react';
import CartCard from '../../organisms/CartCard/CartCard.jsx'
import style from "./Cart.module.css"
import { useSelector } from 'react-redux';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { savePurchase } from '../../../redux/actions/otherActions.js';
import { Redirect } from "react-router-dom";
import mercadopago from '../../organisms/MercadoPago/mercadoPago.jsx'

import NoProductsFound from '../../molecules/NoProductsFound/NoProductsFound.jsx'



export default function Cart(){

  let { cartProducts } = useSelector((state) => state.product)
  let dispatch = useDispatch()
  
  
  let lsCartProducts = JSON.parse(localStorage.getItem('lsCartProducts')) || []
  const [datos,setDatos]= useState("")
    useEffect(()=>{
      axios
      .post("/mercadopago/payment",{lsCartProducts})
      .then((data)=>{
        setDatos(data.data)
        // console.log("data:")
        // console.log(data)
      })
      .catch(err=> console.error(err))
    },[])

    //   useEffect(()=>{
    //    dispatch(savePurchase(lsCartProducts))
    // })
    console.log("lsCartProducts from Cart: ", lsCartProducts)    
      return (
        <div className={style.cart_container}>
          {/* <script src="https://sdk.mercadopago.com/js/v2"></script> */}
          <h1 className={style.h1_cart}>MY CART</h1>
          <div
            className={
              cartProducts.length ? style.card_container : style.empty_container
            }
          >
            {lsCartProducts.length ? (
              lsCartProducts.map((e) => (
                <div>
                  <CartCard key={e.id} product={e} />
                  {/* <span>{e.choosedAmount}</span><span>{e.choosedSize}</span> */}
                </div>
              ))
            ) : (
              <NoProductsFound message="You haven't added products to the cart... yet ;)" />
            )}
          </div>
          
              
         <button className={style.buy_button} ><a href={datos}>BUY</a> </button>
          
        </div>
      );

      

}
