import React from 'react'
import { useSelector } from "react-redux";
import Card from '../../organisms/Card/Card';
import style from './Favorites.module.css'

export default function Favorites() {
    let { favorites } = useSelector((state) => state.product);
  return (
    <div className={style.favoritesContainer}>
        {
        favorites.map(favorite=><Card product={favorite}/>)
        }
    </div>
  )
}
