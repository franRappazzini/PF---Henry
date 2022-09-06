import React, { useEffect, useState } from "react";

import CartCard from "../../organisms/CartCard/CartCard.jsx";
import NoProductsFound from "../../molecules/NoProductsFound/NoProductsFound.jsx";
import axios from "axios";
import style from "./Cart.module.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

//Preguntar si x query llega un status failed y mostrar un toast

export default function Cart() {
  const [lsCartProducts, setLsCartProducts] = useState([]);
  const [datos, setDatos] = useState("");
  let { cartProducts } = useSelector((state) => state.product);
  const search = useLocation().search;
  const status = new URLSearchParams(search).get('status');

  useEffect(() => {
    setLsCartProducts(JSON.parse(localStorage.getItem("lsCartProducts")) || []);

    if(status){
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        ProgressBarColor: "white",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "There was an error with the purchase, please try again",
        background: "#c70000",
        color: "white",
        textAlign: "center",
      });
    }
  }, []);

  const onClickBuy = () => {
    console.log(lsCartProducts)
    axios
      .post("/mercadopago/payment", { lsCartProducts: JSON.parse(localStorage.getItem("lsCartProducts")) })
      .then((data) => {
        window.location.replace(data.data);
      })
      .catch((err) => console.error(err));
  };

  // handleBuy = async () => {
  //   try {
  //     const res = await axios.post("/mercadopago/payment", { lsCartProducts })
  //     setDatos(res.data)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

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

      <button className={style.buy_button} onClick={() => onClickBuy()}>
          BUY
      </button>
    </div>
  );
}
