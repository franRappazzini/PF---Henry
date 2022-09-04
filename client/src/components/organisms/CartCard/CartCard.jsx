import React, { useState } from "react";

import { IoMdClose } from "react-icons/io";
import { removeFromCart } from "../../../redux/actions/productActions.js";
import style from "./CartCard.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Card({ product }) {
  let dispatch = useDispatch();
  const [amount, setAmount] = useState(product.choosedAmount);
  let lsCart = JSON.parse(localStorage.getItem("lsCartProducts")) || [];
  let mySize = product.Sizes.filter((e) => e.size === product.choosedSize.size);
  const stock = mySize[0].Product_Size.stock;

  useEffect(() => {
    const prodFind = lsCart.find((prod) => prod.id === product.id);
    const cartFilter = lsCart.filter((prod) => prod.id !== product.id);
    prodFind.choosedAmount = amount;
    localStorage.setItem(
      "lsCartProducts",
      JSON.stringify([...cartFilter, prodFind])
    );
  }, [amount, product.id]);

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(
      removeFromCart(
        `${product.name}-${product.choosedSize.size}-${product.choosedAmount}`
      )
    );
    lsCart = lsCart.filter((prod) => prod.id !== product.id);
    localStorage.setItem("lsCartProducts", JSON.stringify(lsCart));
  };

  const handlePlus = () => {
    if (amount === stock) return;
    setAmount(amount + 1);
  };

  const handleMin = () => {
    if (amount === 1) return;
    setAmount(amount - 1);
  };

  return (
    <div className={style.box}>
      <div className={style.left_container}>
        <div className={style.image_container}>
          <img
            className={style.product_image}
            src={product.image}
            alt={product.image}
          />
          <div className={style.image_background}></div>
        </div>
        <h2 className={style.price}>{product.price} $</h2>
      </div>
      <div className={style.br}></div>
      <div className={style.right_container}>
        <div className={style.top_right}>
          <button
            onClick={(e) => handleClose(e)}
            className={style.close_button}
          >
            <IoMdClose className={style.close_icon} />
          </button>
        </div>
        <div className={style.info_container}>
          <h1 className={style.title}>{product.name}</h1>
          <span className={style.categories}>
            {product.Categories
              ? product.Categories.map((e) => e.name).join(", ")
              : ""}
          </span>
        </div>
        <div className={style.amount_and_size}>
          <span className={style.size_span}>
            SIZE: {product.choosedSize.size}
          </span>
          <div className={style.plus_min_container}>
            <button onClick={handleMin} className={style.plus_min}>
              -
            </button>
            <button onClick={handlePlus} className={style.plus_min}>
              +
            </button>
          </div>
          <span id="amount" className={style.amount_span}>
            {amount}
          </span>
        </div>
      </div>
    </div>
  );
}
