import React, { useEffect, useState } from "react";
import {
  filter,
  getAllProducts,
} from "../../../redux/actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../organisms/Card/Card";
import DrawerFilter from "../../molecules/DrawerFilter/DrawerFilter.jsx";
import Filters from "../../organisms/Filters/Filters";
import MultipleFilters from "../../organisms/MultipleFilters/MultipleFilters.jsx";
import Order from "../../organisms/Order/Order";
import { Pagination } from "@mui/material";
import SearchBar2 from "../../organisms/SearchBar2/SearchBar2.jsx";
import Slider from "../../organisms/Carousel/Carousel.jsx";
import style from "./Home.module.css";

const instanceFilter = { name: "", brand: "", category: "", size: "" };

let Home = () => {
  const [filters, setFilters] = useState(instanceFilter);
  let { filteredProducts } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const prodPerPage = 12;
  const totalPage = Math.ceil(filteredProducts.length / prodPerPage);
  const innerWidth = window.innerWidth;

  useEffect(() => {
    dispatch(
      filter(filters.name, filters.brand, filters.category, filters.size)
    );
  }, [dispatch, filters]);

  return (
    <div className={style.globalContainer}>
      <div className={style.carouselContainer}>
        <Slider />
      </div>

      <section className={style.utilsHeader}>
        <div className={style.none}></div>

        <SearchBar2 filters={filters} setFilters={setFilters} />

        {innerWidth > 600 && <Order />}

        <DrawerFilter filters={filters} setFilters={setFilters} />
      </section>

      <section className={style.functionalitiesContainer}>
        <div className={style.utilities}>
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        <div className={style.cardsContainer}>
          {filteredProducts.length > 0 &&
            filteredProducts
              .slice(
                (page - 1) * prodPerPage,
                (page - 1) * prodPerPage + prodPerPage
              )
              .map((product) => <Card product={product} />)}
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
