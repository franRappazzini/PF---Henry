import React from 'react'
import PurchaseItem from '../../organisms/PurchaseItem/PurchaseItem'
import SearchBar2 from '../../organisms/SearchBar2/SearchBar2'
import style from './PurchaseHistory.module.css'
import {useLocation} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { saveOrderHistory } from '../../../redux/actions/userActions';

import { Dispatch } from 'react';


export default function PurchaseHistory() {
    const search = useLocation().search;
    const status = new URLSearchParams(search).get('status');
    const paymentId=new URLSearchParams(search).get('paymentId');
    const  payment_type=new URLSearchParams(search).get('payment_type');
    const merchant_order_id=new URLSearchParams(search).get('merchant_order_id');
    const preference_id=new URLSearchParams(search).get('preference_id');
    const dispatch = useDispatch();

    const order={
        status:status,
        paymentId:paymentId,
        payment_type:payment_type,
        merchant_order_id:merchant_order_id,
        preference_id:preference_id
    }

    let lsCartProducts = JSON.parse(localStorage.getItem('lsCartProducts')) || []
    // const {savePurchase} = useSelector(state=>state.other)

    //Y aca me faltaria validar, si nos llega un status o cosas por la URL entonces ahi si deberia guardar
    //Los items del carrito y el detalle de la compra en el user
    //Sino simplemente mostrar el historal de compra
    //Quizas deberiamos tocar el model User
    //Un user tiene muchas compras, esas compras tienen un detalle y varios items
    let bought = [lsCartProducts,order]

    //  useEffect(()=>{
    //     if(status){dispatch(saveOrderHistory(bought))}
    // })

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
                   {lsCartProducts.length} Purchases
                </div>
            </div>
            <div className={style.purchasesContainer}>
                {lsCartProducts.length && lsCartProducts.map(product=><PurchaseItem product={product}/>)}
            </div>
        </div>
    </div>
  )
}
