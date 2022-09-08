import React, { useState } from "react";
import { getBoughts, getLogedUser, saveOrderHistory } from "../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import { Dispatch } from "react";
import PurchaseItem from "../../organisms/PurchaseItem/PurchaseItem";
import PurchaseItems from "../../organisms/PurchaseItems/PurchaseItems";
import SearchBar2 from "../../organisms/SearchBar2/SearchBar2";
import style from "./PurchaseHistory.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PurchaseHistory() {
  const search = useLocation().search;
  const status = new URLSearchParams(search).get("status");
  const payment_id = new URLSearchParams(search).get("payment_id");
  const payment_type = new URLSearchParams(search).get("payment_type");
  const merchant_order_id = new URLSearchParams(search).get("merchant_order_id");
  const preference_id = new URLSearchParams(search).get("preference_id");
  const dispatch = useDispatch();

  //Estos son los datos que me llegan x query despues de cada compra
  const order = {
    status: status,
    payment_id: payment_id,
    payment_type: payment_type,
    merchant_order_id: merchant_order_id,
    preference_id: preference_id,
  };

  const { isAuthenticated, user } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getBoughts(user.email));
    }
    // console.log(user);
    // console.log(logedUser);
  }, [dispatch, isAuthenticated, user]);
  
  const { boughts } = useSelector((state) => state.user);
  const boughtList = boughts;
  console.log("BOUGHTS");
  console.log(boughtList);

  let lsCartProducts = JSON.parse(localStorage.getItem("lsCartProducts")) || [];
  let adress = JSON.parse(localStorage.getItem("adress")) || [];
  // const {savePurchase} = useSelector(state=>state.other)

  //Y aca me faltaria validar, si nos llega un status o cosas por la URL entonces ahi si deberia guardar
  //Los items del carrito y el detalle de la compra en el user
  //Sino simplemente mostrar el historal de compra
  //Quizas deberiamos tocar el model User
  //Un user tiene muchas compras, esas compras tienen un detalle y varios items
  // let bought = [lsCartProducts,order,user]

  useEffect(() => {
    if (isAuthenticated && status) {
      let bought = { lsCartProducts, order, user, adress };
      console.log("en el if del use");
      console.log(bought);
      async function exe() {
        await saveOrderHistory(bought);
        dispatch(getBoughts(user.email));
      }
      exe();
      localStorage.setItem("lsCartProducts", "[]");
    }
  }, [isAuthenticated, dispatch, status, boughts]);

  // console.log(status)
  console.log('BoughtList:', boughtList);
  return (
    <div className={style.globalContainer}>
      <div className={style.container}>
        <div className={style.title}>My Purchases</div>
        <div className={style.header}>
          <div className={style.searchBar}>{/* <SearchBar2 label="Search" /> */}</div>
          <div className={style.number}>{boughtList.length} Purchases</div>
        </div>
        <div className={style.purchasesContainer}>
          {boughtList.map((bought) => {
            if (bought.Product_Sizes?.length === 1) {
              return <PurchaseItem product={bought.Product_Sizes[0]} statee={bought.state} />;
            } else if (bought.Product_Sizes?.length > 1) {
              return <PurchaseItems products={bought.Product_Sizes} statee={bought.state} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}
