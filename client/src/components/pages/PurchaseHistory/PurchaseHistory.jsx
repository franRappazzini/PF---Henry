import React, { useState } from 'react'
import PurchaseItem from '../../organisms/PurchaseItem/PurchaseItem'
import SearchBar2 from '../../organisms/SearchBar2/SearchBar2'
import style from './PurchaseHistory.module.css'
import {useLocation} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { getBoughts, getLogedUser, saveOrderHistory } from '../../../redux/actions/userActions';

import { Dispatch } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


export default function PurchaseHistory() {
    const search = useLocation().search;
    const status = new URLSearchParams(search).get('status');
    const payment_id=new URLSearchParams(search).get('payment_id');
    const  payment_type=new URLSearchParams(search).get('payment_type');
    const merchant_order_id=new URLSearchParams(search).get('merchant_order_id');
    const preference_id=new URLSearchParams(search).get('preference_id');
    const dispatch = useDispatch();


    //Estos son los datos que me llegan x query despues de cada compra
    const order={
        status:status,
        payment_id:payment_id,
        payment_type:payment_type,
        merchant_order_id:merchant_order_id,
        preference_id:preference_id
    }

    const { isAuthenticated, user } = useAuth0();
    useEffect(() => {
        if(isAuthenticated){
            dispatch(getBoughts(user.email))
        }
        // console.log(user);
        // console.log(logedUser);
    }, [dispatch, isAuthenticated, user]) 
    const {boughts} = useSelector((state)=>state.user)
    const boughtList = boughts
    console.log("BOUGHTS")
    console.log(boughtList)

    let lsCartProducts = JSON.parse(localStorage.getItem('lsCartProducts')) || []
    // const {savePurchase} = useSelector(state=>state.other)

    //Y aca me faltaria validar, si nos llega un status o cosas por la URL entonces ahi si deberia guardar
    //Los items del carrito y el detalle de la compra en el user
    //Sino simplemente mostrar el historal de compra
    //Quizas deberiamos tocar el model User
    //Un user tiene muchas compras, esas compras tienen un detalle y varios items
    // let bought = [lsCartProducts,order,user]
    
    

     useEffect(()=>{
        if(isAuthenticated && status){
            let bought = {lsCartProducts,order,user}
            console.log("en el if del use")
            console.log(bought)
            saveOrderHistory(bought)
            dispatch(getBoughts(user.email))
            localStorage.setItem("lsCartProducts", "[]")
        }
    },[isAuthenticated, dispatch])

    // console.log(status)

  return (
    <div className={style.globalContainer}>
        <div className={style.container}>
            <div className={style.title}>
                My Purchases
            </div>
            <div className={style.header}>
                <div className={style.searchBar}>
                    <SearchBar2 label='Search'/>
                </div>
                <div className={style.number}>
                   {boughtList.length} Purchases
                </div>
            </div>
            <div className={style.purchasesContainer}>
                {boughtList.length && boughtList.map(product=><PurchaseItem product={product}/>)}
            </div>
        </div>
    </div>
  )
}
