import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import OrdersTable from '../OrdersTable/OrdersTable'
import ProgressBar from '../ProgressBar/ProgressBar'
import style from './OrdersOption.module.css'
import { BiArrowBack } from 'react-icons/bi'
import { getAllBoughts } from '../../../redux/actions/productActions';

export default function OrdersOption() {
    let dispatch = useDispatch()
    let { boughts } = useSelector((state) => state.product);
    let [selected,setSelected] = useState('orders')    
    let [order, setOrder] = useState()
    let [status, setStatus] = useState()

    useEffect(()=>{
        dispatch(getAllBoughts())
      },[dispatch])

  return (
    <div className={style.globalContainer}>
        <div className={style.ordersContainer}>
            <div className={style.ordersHeader}>
                <div>
                    Orders
                </div>
            </div>
            {
                selected==='orders'
                ? (
                    <div className={style.ordersTable}>
                        <OrdersTable selected={selected} setSelected={setSelected} setOrder={setOrder} setStatus={setStatus} rows={boughts}/>
                    </div>
                  )
                : (           
                     <div className={style.progressBar}>
                        <BiArrowBack className={style.back} size={40} onClick={()=>{setSelected('orders')}}/>
                        <div className={style.progressHeader}>
                            
                            <div className={style.orderNumber}>
                               { `Order N° ${order}` }
                            </div>
                        </div>                        
                        <ProgressBar status={status} rows={boughts} order={order}/>  
                    </div>
                  )
            }
        </div>                                                                                  
    </div>
  )
}
