import React from 'react'
import style from './DashboardOption.module.css'
import {HiTrendingUp} from 'react-icons/hi'
import {BiUser} from 'react-icons/bi'
import {FiBox} from 'react-icons/fi'
import {BsCurrencyDollar} from 'react-icons/bs'

export default function DashboardOption() {
  return (
    <div className={style.globalContainer}>
      <div className={style.statisticsContainer}>

        <div className={style.statisticsHeader}>
          <div>Statistics</div>
        </div>

        <div className={style.statistics}>
          
          <div className={style.statisticsItem}>
            <HiTrendingUp className={style.icon}/>
            <div className={style.itemTitle}>Sales</div>
          </div>

          <div className={style.statisticsItem}>
            <BiUser className={style.icon}/>
            <div className={style.itemTitle}>Customers</div>
          </div>

          <div className={style.statisticsItem}>
            <FiBox className={style.icon}/>
            <div className={style.itemTitle}>Products</div>
          </div>
          
          <div className={style.statisticsItem}>
            <BsCurrencyDollar className={style.icon}/>
            <div className={style.itemTitle}>Revenue</div>
          </div>

        </div>
      </div>
      <div>

      </div>

    </div>
  )
}


