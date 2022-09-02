import React, {useEffect, useState} from 'react'
import OrdersTable from '../OrdersTable/OrdersTable'
import ProgressBar from '../ProgressBar/ProgressBar'
import style from './OrdersOption.module.css'
import { BiArrowBack } from 'react-icons/bi'

export default function OrdersOption() {
    let [selected,setSelected] = useState('orders')
    let [order, setOrder] = useState()
    let [status, setStatus] = useState()

      let rows = [
        {
            date: 'Aug 30, 2022',
            adress: 'xxxxxxx',
            email: 'xxxxxxx@gmail.com',
            method: 'xxxxx',
            amount: 'xxxxx$',
            status: 'Pending',
            order: 4321
        },
        {
            date: 'Aug 5, 2022',
            adress: 'xxxxxxx',
            email: 'xxxxxxx@gmail.com',
            method: 'xxxxx',
            amount: 'xxxxx$',
            status: 'In Progress',
            order: 8741
        },
        {
            date: 'June 12, 2022',
            adress: 'xxxxxxx',
            email: 'xxxxxxx@gmail.com',
            method: 'xxxxx',
            amount: 'xxxxx$',
            status: 'Completed',
            order: 7411
        },
        {
            date: 'July 2, 2022',
            adress: 'xxxxxxx',
            email: 'xxxxxxx@gmail.com',
            method: 'xxxxx',
            amount: 'xxxxx$',
            status: 'Completed',
            order: 9312
        },
        {
            date: 'April 22, 2022',
            adress: 'xxxxxxx',
            email: 'xxxxxxx@gmail.com',
            method: 'xxxxx',
            amount: 'xxxxx$',
            status: 'Pending',
            order: 2931
        }
      ]

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
                        <OrdersTable selected={selected} setSelected={setSelected} setOrder={setOrder} setStatus={setStatus} rows={rows}/>
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
                        <ProgressBar status={status} rows={rows} order={order}/>/   
                    </div>
                  )
            }
        </div>                                                                                  
    </div>
  )
}
