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
                        <ProgressBar status={status} rows={rows} order={order}/>  
                    </div>
                  )
            }
        </div>                                                                                  
    </div>
  )
}
