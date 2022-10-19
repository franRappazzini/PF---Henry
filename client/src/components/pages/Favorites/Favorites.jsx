import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../../organisms/Card/Card';
import style from './Favorites.module.css';
import Slider from '../../organisms/Carousel/Carousel.jsx';
import NoProductsFound from '../../molecules/NoProductsFound/NoProductsFound';

export default function Favorites() {
  let lsFavorites = JSON.parse(localStorage.getItem('lsFavorites')) || []
  let { favorites } = useSelector(state=> state.product)

  useEffect(() => {

  }, [lsFavorites]);


  return (
<div className={style.globalContainer}>

    <div className={style.carouselContainer}>
      <Slider/>
    </div>
    
    <div className={style.favoritesContainer}>
      {
        lsFavorites?.length?lsFavorites.map(favorite => <Card key={favorite.id} product={favorite}/>):<NoProductsFound message='There are no products added to favorites, im sorry.'/>
      }
    </div>

</div>
  )
}
