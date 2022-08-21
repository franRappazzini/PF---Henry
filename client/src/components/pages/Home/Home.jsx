import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../organisms/Card/Card";
import Filters from "../../organisms/Filters/Filters";
import Order from "../../organisms/Order/Order";
import { Pagination } from "@mui/material";
import Slider from "../../organisms/Carousel/Carousel.jsx";
import { getAllProducts } from "../../../redux/actions/productActions.js";
import style from "./Home.module.css";

let Home = () => {
  let { filteredProducts } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const prodPerPage = 12;
  const totalPage = Math.ceil(filteredProducts.length / prodPerPage);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className={style.globalContainer}>
      <div className={style.carouselContainer}>
        <Slider />
      </div>

      <section className={style.order_container}>
        <Order />
      </section>

      <div className={style.functionalitiesContainer}>
        <div className={style.utilities}>
          <Filters />
        </div>

        <div className={style.cardsContainer}>
          {filteredProducts
            .slice(
              (page - 1) * prodPerPage,
              (page - 1) * prodPerPage + prodPerPage
            )
            .map((product, i) => (
              <Card key={i} product={product} />
            ))}
        </div>
      </div>

      <section className={style.pagination_container}>
        <Pagination
          count={totalPage}
          shape="rounded"
          onChange={(e, value) => setPage(value)}
        />
      </section>
    </div>
  );
};

export default Home;
