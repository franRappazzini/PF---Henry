import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../organisms/Card/Card";
import DrawerFilter from "../../molecules/DrawerFilter/DrawerFilter.jsx";
import Filters from "../../organisms/Filters/Filters";
import Order from "../../organisms/Order/Order";
import { Pagination } from "@mui/material";
import SearchBar2 from "../../organisms/SearchBar2/SearchBar2.jsx";
import Slider from "../../organisms/Carousel/Carousel.jsx";
import { filter } from "../../../redux/actions/productActions.js";
import { getAllProducts } from "../../../redux/actions/productActions.js";
import style from "./Home.module.css";

const instanceFilter = {
  name: "",
  brand: "",
  category: "",
  size: "",
  order: { by: "price", order: "" },
};

let Home = () => {
  const [filters, setFilters] = useState(instanceFilter);
  let { products } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const prodPerPage = 12;
  const totalPage = Math.ceil(products.length / prodPerPage);

  useEffect(() => {
    dispatch(
      filter(
        filters.name,
        filters.brand,
        filters.category,
        filters.size,
        filters.order.by,
        filters.order.order
      )
    );
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className={style.globalContainer}>
      <div className={style.carouselContainer}>
        <Slider />
      </div>

      <section className={style.utilsHeader}>
        <div className={style.none}></div>

        <SearchBar2 filters={filters} setFilters={setFilters} />

        <div className={style.order_desktop}>
          <Order filters={filters} setFilters={setFilters} />
        </div>

        <DrawerFilter filters={filters} setFilters={setFilters} />
      </section>

      <section className={style.functionalitiesContainer}>
        <div className={style.utilities}>
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        <div className={style.cardsContainer}>
          {products.length > 0 &&
            products
              .slice(
                (page - 1) * prodPerPage,
                (page - 1) * prodPerPage + prodPerPage
              )
              .map((product) => <Card key={product.id} product={product} />)}
        </div>
      </section>
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
