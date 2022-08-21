import { Button, Pagination, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  searchProduct,
} from "../../../redux/actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../organisms/Card/Card";
import Filters from "../../organisms/Filters/Filters";
import Order from "../../organisms/Order/Order";
import Slider from "../../organisms/Carousel/Carousel.jsx";
import style from "./Home.module.css";

let Home = () => {
  const [search, setSearch] = useState("");
  let { filteredProducts } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const prodPerPage = 12;
  const totalPage = Math.ceil(filteredProducts.length / prodPerPage);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    dispatch(searchProduct(search));
  }

  return (
    <div className={style.globalContainer}>
      <div className={style.carouselContainer}>
        <Slider />
      </div>

      <section className={style.order_container}>
        <form onSubmit={handleSearch} className={style.search_container}>
          <TextField
            label="Product"
            variant="standard"
            onChange={handleChange}
            value={search}
          />
          <Button type="submit">Search</Button>
        </form>
        <Order />
      </section>

      <div className={style.functionalitiesContainer}>
        <div className={style.utilities}>
          <Filters />
        </div>
        <div className={style.cardsContainer}>
          {filteredProducts.length > 0 &&
            filteredProducts
              .slice(
                (page - 1) * prodPerPage,
                (page - 1) * prodPerPage + prodPerPage
              )
              .map((product, i) => <Card key={i} product={product} />)}
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
