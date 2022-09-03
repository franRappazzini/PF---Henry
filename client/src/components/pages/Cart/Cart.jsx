import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import CartCard from "../../organisms/CartCard/CartCard.jsx";
import { Link } from "react-router-dom";
import NoProductsFound from "../../molecules/NoProductsFound/NoProductsFound.jsx";
import axios from "axios";
import mercadopago from "../../organisms/MercadoPago/mercadoPago.jsx";
import style from "./Cart.module.css";
import { useSelector } from "react-redux";

export default function Cart() {
  // const mercadopago = new MercadoPago('1227878501550808', {
  //   locale: 'YOUR_LOCALE' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  // });
  let { cartProducts } = useSelector((state) => state.product);

  let lsCartProducts = JSON.parse(localStorage.getItem("lsCartProducts")) || [];
  const [datos, setDatos] = useState("");
  useEffect(() => {
    axios
      .post("http://localhost:3001/mercadopago/payment", { lsCartProducts })
      .then((data) => {
        setDatos(data.data);
        console.log("data:");
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log("lsCartProducts from Cart: ", lsCartProducts);
  return (
    <div className={style.cart_container}>
      <script src="https://sdk.mercadopago.com/js/v2"></script>
      <h1 className={style.h1_cart}>MY CART</h1>
      <div
        className={
          cartProducts.length ? style.card_container : style.empty_container
        }
      >
        {lsCartProducts.length ? (
          lsCartProducts.map((e) => (
            <div key={e.id}>
              <CartCard product={e} />
              {/* <span>{e.choosedAmount}</span><span>{e.choosedSize}</span> */}
            </div>
          ))
        ) : (
          <NoProductsFound message="You haven't added products to the cart... yet ;)" />
        )}
      </div>

      <button className={style.buy_button}>
        <a href={datos} className={style.a}>
          BUY
        </a>{" "}
      </button>
    </div>
  );
}
