import React, {useEffect, useState} from 'react'
import OrdersTable from '../OrdersTable/OrdersTable'
import ProgressBar from '../ProgressBar/ProgressBar'
import style from './OrdersOption.module.css'
import { BiArrowBack } from 'react-icons/bi'

export default function OrdersOption() {
    let [selected,setSelected] = useState('orders')
    let [order, setOrder] = useState()
    let [status, setStatus] = useState()

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
                        <OrdersTable selected={selected} setSelected={setSelected} setOrder={setOrder} setStatus={setStatus}/>
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
                        <ProgressBar status={status}/>
                    </div>
                  )
            }
        </div>                                                                                  
    </div>
  )
}
