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
    console.log(order.status)
    console.log(order.paymentId)
    console.log(order.payment_type)
    console.log(order.merchant_order_id)
    console.log(order.preference_id)


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
    console.log("save:")
    console.log(lsCartProducts)

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
                    5 Purchases
                </div>
            </div>
            <div className={style.purchasesContainer}>
                {/* {purchases.map(purchase=><PurchaseItem purchase={purchase}/>)} */}
                {/* <PurchaseItem/>
                <PurchaseItem/>
                <PurchaseItem/>
                <PurchaseItem/>
                <PurchaseItem/> */}
                {/* <div> Holalalala</div> */}
                {/* name={e.name} image={e.image} price={e.price} choosedAmount={e.choosedAmount} 
                    brand={e.Brand.name} choosedSize={e.choosedSize.size} */}
                {lsCartProducts.length>0 && lsCartProducts.map((e)=>{
                    return(
                        <div>
                        <div>
                            <PurchaseItem items={lsCartProducts}/>
                        {/* <p>{status}</p>
                        <p>{payment_type}</p>
                        <p>{merchant_order_id}</p>
                        <p>{preference_id}</p>
                        <p>{e.name}</p>
                        <p>{e.price}</p>
                        <p>{e.choosedAmount}</p>
                        <img src={e.image}></img>
                        <p>{e.Brand.name}</p> */}
                       </div>
                       <div>
                       <p>{status}</p>
                        <p>{payment_type}</p>
                        <p>{merchant_order_id}</p>
                        <p>{preference_id}</p>
                       </div>
                       </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}
