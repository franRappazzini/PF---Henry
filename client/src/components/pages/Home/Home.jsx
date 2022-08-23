import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../../redux/actions/productActions.js';
import { useDispatch, useSelector } from 'react-redux';
import MultipleFilters from '../../organisms/MultipleFilters/MultipleFilters.jsx';
import Card from '../../organisms/Card/Card';
import Filters from '../../organisms/Filters/Filters';
import Order from '../../organisms/Order/Order';
import Slider from '../../organisms/Carousel/Carousel.jsx';
import style from './Home.module.css';
import SearchBar2 from '../../organisms/SearchBar2/SearchBar2.jsx';

let Home = () => {
  let { filteredProducts } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const prodPerPage = 12;
  const totalPage = Math.ceil(filteredProducts.length / prodPerPage);
  let width = window.innerWidth;
  let [dimensions, setDimensions] = useState({
    width: window.innerWidth
  })
  let handleResize = () => {
    setDimensions({
      width: window.innerWidth
    })
  }

  useEffect(() => {
    dispatch(getAllProducts());
    window.addEventListener('resize', handleResize, false);
  }, [dispatch]);

  return (
    <div className={style.globalContainer}>
      <div className={style.carouselContainer}>
        <Slider />
      </div>
      <div className={style.utilsHeader}>
        {width < 601 ? <MultipleFilters/> : null}
        <SearchBar2/>
        <div className={style.orderContainer}>
          <Order/>
        </div> 
      </div>    
      <div className={style.functionalitiesContainer}>
        <div className={style.utilities}>
          {width > 600 ? <Filters/> : null}
        </div>
        <div className={style.cardsContainer}>
          {filteredProducts.length &&
            filteredProducts
              .slice(
                (page - 1) * prodPerPage,
                (page - 1) * prodPerPage + prodPerPage
              )
              .map(product => <Card key={product.id} product={product}/>)}
        </div>
      </div>
      <section className={style.pagination_container}>
        <Pagination
          count={totalPage}
          shape='rounded'
          onChange={(e, value) => setPage(value)}
        />
      </section>
    </div>
  );
};

export default Home;
