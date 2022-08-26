import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../organisms/Card/Card';
import style from './Favorites.module.css';
import Slider from '../../organisms/Carousel/Carousel.jsx';
import NoProductsFound from '../../molecules/NoProductsFound/NoProductsFound';

export default function Favorites() {
  let { favorites } = useSelector((state) => state.product)

  return (
<div className={style.globalContainer}>

    <div className={style.carouselContainer}>
      <Slider/>
    </div>
    
    <div className={style.favoritesContainer}>
      {
        favorites.length?favorites.map(favorite => <Card key={favorite.id} product={favorite}/>):<NoProductsFound message='There are no products added to favorites, im sorry.'/>
      }
    </div>

</div>
  )
}
