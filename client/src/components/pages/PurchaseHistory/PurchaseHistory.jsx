import React from 'react'
import PurchaseItem from '../../organisms/PurchaseItem/PurchaseItem'
import SearchBar2 from '../../organisms/SearchBar2/SearchBar2'
import style from './PurchaseHistory.module.css'

export default function PurchaseHistory() {
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
                <PurchaseItem/>
                <PurchaseItem/>
                <PurchaseItem/>
                <PurchaseItem/>
                <PurchaseItem/>
            </div>
        </div>
    </div>
  )
}
