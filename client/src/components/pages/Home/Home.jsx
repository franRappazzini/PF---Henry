import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../organisms/Card/Card";
import { getAllProducts } from "../../../redux/actions/productActions.js";
import style from "./Home.module.css";
import Slider from '../../organisms/Carousel/Carousel.jsx'

let Home = () => {
  let { products } = useSelector((state) => state.product);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  
  return (
    <div className={style.globalContainer}>
        <div className={style.carouselContainer}>
            <Slider/>
        </div>
        <div className={style.functionalitiesContainer}>
            <div className={style.utilities}>
                
            </div>
            <div className={style.cardsContainer}>
              {products.map((product) => (
                <Card product={product}/>
              ))}
            </div>
        </div>
    </div>
  );
};

export default Home;
