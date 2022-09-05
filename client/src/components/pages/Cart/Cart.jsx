import React, { useEffect, useState } from "react";

import CartCard from "../../organisms/CartCard/CartCard.jsx";
import NoProductsFound from "../../molecules/NoProductsFound/NoProductsFound.jsx";
import axios from "axios";
import style from "./Cart.module.css";
import { useSelector } from "react-redux";

//Preguntar si x query llega un status failed y mostrar un toast

export default function Cart() {
  const [lsCartProducts, setLsCartProducts] = useState([]);
  const [datos, setDatos] = useState("");
  let { cartProducts } = useSelector((state) => state.product);

  useEffect(() => {
    setLsCartProducts(JSON.parse(localStorage.getItem("lsCartProducts")) || []);
  }, []);

  useEffect(() => {
    axios
      .post("/mercadopago/payment", { lsCartProducts })
      .then((data) => {
        setDatos(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={style.cart_container}>
      {/* <script src="https://sdk.mercadopago.com/js/v2"></script> */}
      <h1 className={style.h1_cart}>MY CART</h1>
      <div
        className={
          cartProducts.length ? style.card_container : style.empty_container
        }
      >
        {lsCartProducts.length ? (
          lsCartProducts.map((e, i) => (
            <div key={i}>
              <CartCard
                product={e}
                lsCartProducts={lsCartProducts}
                setLsCartProducts={setLsCartProducts}
              />
              {/* <span>{e.choosedAmount}</span><span>{e.choosedSize}</span> */}
            </div>
          ))
        ) : (
          <NoProductsFound message="You haven't added products to the cart... yet ;)" />
        )}
      </div>

      <button className={style.buy_button}>
        <a href={datos}>BUY</a>{" "}
      </button>
    </div>
  );
}
