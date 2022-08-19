import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../organisms/Card/Card";
import { getAllProducts } from "../../../redux/actions/productActions.js";
import style from "./Home.module.css";
import Order from "../../organisms/Order/Order";
import Filters from "../../organisms/Filters/Filters";

let Home = () => {
  let { filteredProducts } = useSelector((state) => state.product);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div>

        <Order />
        <Filters/>
    <div className={style.container}>
      {filteredProducts.map((product) => (
        <Card product={product} />
      ))}
    </div>


    </div>
  );
};

export default Home;
