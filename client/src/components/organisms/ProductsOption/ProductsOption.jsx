import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../Card/Card.jsx";
import SearchBar2 from "../SearchBar2/SearchBar2";
import { filter } from "../../../redux/actions/productActions";
import { getAllProducts } from "../../../redux/actions/productActions";
import style from "./ProductsOption.module.css";

export default function ProductsOption() {
  const [search, setSearch] = useState("");
  let { products } = useSelector((state) => state.product);
  // let dispatch = useDispatch();

  // const instanceFilter = {
  //   name: "",
  //   brand: "",
  //   category: "",
  //   size: "",
  //   order: { by: "price", order: "" },
  // };
  // const [filters, setFilters] = useState(instanceFilter);

  // useEffect(() => {
  //   dispatch(
  //     filter(
  //       filters.name,
  //       filters.brand,
  //       filters.category,
  //       filters.size,
  //       filters.order.by,
  //       filters.order.order
  //     )
  //   );
  // }, [dispatch, filters]);

  // useEffect(() => {
  //   dispatch(getAllProducts());
  // }, [products]);

  function filterProds() {
    if (products.length) {
      if (search !== "") {
        return products.filter((prod) =>
          prod.name.toLowerCase().includes(search.toLowerCase())
        );
      } else return products;
    } else return [];
  }

  return (
    <div className={style.globalContainer}>
      <div className={style.productsHeader}>Products</div>

      <div className={style.cardsContainer}>
        <div className={style.searchBarContainer}>
          <SearchBar2
            // filters={filters}
            // setFilters={setFilters}
            prodSearched={search}
            setProdSearched={setSearch}
            label="Search product"
          />
        </div>
        {filterProds().map((product) => (
          <Card key={product.id} product={product} dashboard={true} />
        ))}
      </div>
    </div>
  );
}
