import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../organisms/Card/Card";
import { getAllProducts } from "../../../redux/actions/productActions.js";
import style from "./Home.module.css";

let Home = () => {
  let { products } = useSelector((state) => state.product);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div className={style.container}>
      {products.map((product) => (
        <Card product={product} />
      ))}
    </div>
  );
};

export default Home;
