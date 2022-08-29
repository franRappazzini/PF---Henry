import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import NoProductsFound from "../../molecules/NoProductsFound/NoProductsFound.jsx";
import Card from "../Card/Card.jsx";
import SearchBar2 from "../SearchBar2/SearchBar2";
import { filter } from "../../../redux/actions/productActions";
import { getAllProducts } from "../../../redux/actions/productActions";
import style from "./ProductsOption.module.css";
import { Pagination } from "@mui/material";

export default function ProductsOption() {
  let dispatch = useDispatch()
  const [search, setSearch] = useState("");
  let { products } = useSelector((state) => state.product);
  const [width, setWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);
  const prodPerPage = 12;
  const totalPage = Math.ceil(filterProds().length / prodPerPage);

  useEffect(() => {
    dispatch(getAllProducts())
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    setPage(1);
  }, [dispatch]);

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
        {/* {filterProds().map((product) => (
          <Card key={product.id} product={product} dashboard={true} />
        ))} */}
                {filterProds().length ? (
          <div className={style.paginationCardsContainer}>
            {width > 600
              ? filterProds()
                  .slice(
                    (page - 1) * prodPerPage,
                    (page - 1) * prodPerPage + prodPerPage
                  )
                  .map((product) => <Card key={product.id} product={product} dashboard={true}/>)
              : filterProds().map((product) => (
                  <Card key={product.id} product={product} dashboard={true} />
                ))}
          </div>
        ) : (
          <NoProductsFound message="There are no products, im sorry." />
        )}
      </div>
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
}
