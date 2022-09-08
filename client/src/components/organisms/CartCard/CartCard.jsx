import React, { useState } from "react";

import { IoMdClose } from "react-icons/io";
import { priceFormat } from "../../../utils/functions";
import { removeFromCart } from "../../../redux/actions/productActions";
import style from "./CartCard.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function CartCard({ product, lsCartProducts, setLsCartProducts, handleAmount }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(product.choosedAmount);
  let mySize = product.Sizes.filter((e) => e.size === product.choosedSize.size);
  // console.log("my size", mySize)
  const stock = mySize[0].Product_Size.stock;
  // const [totalPrice,setTotalPrice]= useState(product.pr)

  useEffect(() => {
    // para actualizar el choisedAmount
    const prodFind = lsCartProducts.find((prod) => prod.idRemove === product.idRemove);
    const cartFilter = lsCartProducts.filter((prod) => prod.idRemove !== product.idRemove);
    prodFind.choosedAmount = amount;
    localStorage.setItem("lsCartProducts", JSON.stringify([...cartFilter, prodFind]));
  }, [amount, product.idRemove, lsCartProducts]);

  const handleClose = () => {
    const newCart = lsCartProducts.filter((prod) => prod.idRemove !== product.idRemove);
    dispatch(removeFromCart(product.cartId));
    localStorage.setItem("lsCartProducts", JSON.stringify(newCart));
    setLsCartProducts(newCart);
  };

  const handlePlus = async () => {
    if (amount === stock) return;
    setAmount(amount + 1);
    handleAmount();
  };

  const handleMin = async () => {
    if (amount === 1) return;
    setAmount(amount - 1);
    handleAmount();
  };

  const price_products_total = priceFormat(product.price * amount);

  return (
    <div className={style.box}>
      <div className={style.left_container}>
        <div className={style.image_container}>
          <img className={style.product_image} src={product.image} alt={product.image} />
          <div className={style.image_background}></div>
        </div>
        {/* <h2 className={style.price}>{product.price} $</h2> */}
      </div>
      <div className={style.br}></div>

      {/* <div className={style.top_right}>
          <button onClick={handleClose} className={style.close_button}>
            <IoMdClose className={style.close_icon} />
          </button>
        </div> */}
      <div className={style.info_container}>
        <h1 className={style.title}>{product.name}</h1>
        <span className={style.categories}>
          {product.Categories ? product.Categories.map((e) => e.name).join(", ") : ""}
        </span>
      </div>
      <div className={style.amount_and_size}>
        <span className={style.size_span}>SIZE: {product.choosedSize.size}</span>
        <div className={style.plus_min_container}>
          <button onClick={handleMin} className={style.plus_min}>
            -
          </button>
          <span id="amount" className={style.amount_span}>
            {amount}
          </span>
          <button onClick={handlePlus} className={style.plus_min}>
            +
          </button>
        </div>
      </div>

      <div className={style.price_product}>${price_products_total}</div>

      <div className={style.top_right}>
        <button onClick={handleClose} className={style.close_button}>
          <IoMdClose className={style.close_icon} />
        </button>
      </div>
    </div>
  );
}
