import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../organisms/Card/Card";
import DrawerFilter from "../../molecules/DrawerFilter/DrawerFilter.jsx";
import Filters from "../../organisms/Filters/Filters";
import NoProductsFound from "../../molecules/NoProductsFound/NoProductsFound";
import Order from "../../organisms/Order/Order";
import { Pagination } from "@mui/material";
import SearchBar2 from "../../organisms/SearchBar2/SearchBar2.jsx";
import Slider from "../../organisms/Carousel/Carousel.jsx";
import axios from "axios";
import { filter } from "../../../redux/actions/productActions.js";
import { getAllProducts } from "../../../redux/actions/productActions.js";
import style from "./Home.module.css";

const instanceFilter = {
  // name: "",
  brand: "",
  category: "",
  size: "",
  order: { by: "price", order: "" },
};

let Home = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [filters, setFilters] = useState(instanceFilter);
  const [prodSearched, setProdSearched] = useState("");
  let { products } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const prodPerPage = 12;
  const totalPage = Math.ceil(filterProds().length / prodPerPage);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
  }, []);

  useEffect(() => {
    dispatch(
      filter(
        // filters.name,
        filters.brand,
        filters.category,
        filters.size,
        filters.order.by,
        filters.order.order
      )
    );
    setPage(1);
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(getAllProducts());

    // para tener disponibles todas las marcas
    axios.get("/brand/upload");
  }, [dispatch]);

  function filterProds() {
    if (products.length) {
      if (prodSearched !== "") {
        return products.filter((prod) =>
          prod.name.toLowerCase().includes(prodSearched.toLowerCase())
        );
      } else return products;
    } else return [];
  }

  return (
    <div className={style.globalContainer}>
      <div className={style.carouselContainer}>
        <Slider />
      </div>

      <section className={style.utilsHeader}>
        <div className={style.none}></div>

        <SearchBar2
          filters={filters}
          setFilters={setFilters}
          prodSearched={prodSearched}
          setProdSearched={setProdSearched}
          label="Search model"
        />

        <div className={style.order_desktop}>
          <Order filters={filters} setFilters={setFilters} />
        </div>

        <DrawerFilter filters={filters} setFilters={setFilters} />
      </section>

      <section className={style.functionalitiesContainer}>
        <div className={style.utilities}>
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        {filterProds().length ? (
          <div className={style.cardsContainer}>
            {width > 600
              ? filterProds()
                  .slice(
                    (page - 1) * prodPerPage,
                    (page - 1) * prodPerPage + prodPerPage
                  )
                  .map((product) => <Card key={product.id} product={product} />)
              : filterProds().map((product) => (
                  <Card key={product.id} product={product} dashboard={false} />
                ))}
          </div>
        ) : (
          <NoProductsFound message="There are no products with these properties, im sorry." />
        )}
      </section>
      {window.innerWidth > 600 ? (
        <section className={style.pagination_container}>
          <Pagination
            count={totalPage}
            shape="rounded"
            onChange={(e, value) => setPage(value)}
          />
        </section>
      ) : null}
    </div>
  );
};

export default Home;
