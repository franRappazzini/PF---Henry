import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../organisms/Card/Card";
import Carousel from "react-material-ui-carousel";
import { Pagination } from "@mui/material";
import { getAllProducts } from "../../../redux/actions/productActions.js";
import style from "./Home.module.css";

let Home = () => {
  let { products } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const prodPerPage = 12;
  const totalPage = Math.ceil(products.length / prodPerPage);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className={style.globalContainer}>
      <div className={style.carouselContainer}>
        {/* <Carousel>
            {
                items.map( (item) => <div>{item.description}</div> )
            }
        </Carousel>         */}
      </div>
      <div className={style.functionalitiesContainer}>
        <div className={style.utilities}></div>
        <div className={style.cardsContainer}>
          {products
            .slice(
              (page - 1) * prodPerPage,
              (page - 1) * prodPerPage + prodPerPage
            )
            .map((product) => (
              <Card product={product} />
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
