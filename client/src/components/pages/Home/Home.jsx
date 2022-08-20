import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../organisms/Card/Card";
import Filters from "../../organisms/Filters/Filters";
import Order from "../../organisms/Order/Order";
import { Pagination } from "@mui/material";
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
    console.log(filteredProducts);
  }, [dispatch]);

  return (
    <div>
      <Order />
      <Filters />
      <div className={style.container}>
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
      </div>
    </div>
  );
};

export default Home;
