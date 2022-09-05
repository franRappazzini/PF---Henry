import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useEffect, useState } from "react";

import Card from "../Card/Card.jsx";
import { Carousel } from "react-responsive-carousel";
import { getAllProducts } from "../../../redux/actions/productActions";
import style from "./CarouselContainer.module.css";
import { useDispatch } from "react-redux";

export default function CarouselContainer({ productDetail, products }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  /* const [carouselProducts, setCarouselProducts] = useState({}) */
  let filteredProducts = products.filter(
    (e) => e.Brand.name === productDetail.Brand.name
  );

  return (
    <div className={style.carousel_container}>
      <Carousel
        showThumbs={false}
        showIndicators={false}
        infiniteLoop="true"
        emulateTouch="true"
        centerSlidePercentage={30}
        centerMode={true}
        autoPlay={true}
        className={style.carousel}
      >
        {filteredProducts.map((product) => (
          <div key={product.id} className={style.item_container}>
            <Card className={style.card} key={product.id} product={product} />
          </div>
        ))}
        {/* <div className={style.item_container}></div>
                <div className={style.item_container}></div>
                <div className={style.item_container}></div>
                <div className={style.item_container}></div>
                <div className={style.item_container}>{<Card key={products[0].id} product={products[0]}/>}</div> */}
      </Carousel>
    </div>
  );
}
