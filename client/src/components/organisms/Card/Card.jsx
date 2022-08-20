import React, { useState } from "react";
import {
  SiAdidas,
  SiNewbalance,
  SiNike,
  SiPuma,
  SiReebok,
} from "react-icons/si";

import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import style from "./Card.module.css";

export default function Card({ product }) {
  let [fav, setFav] = useState(false);
  let handleFav = () => {
    setFav((current) => !current);
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.header}>
          {product.Brand.name === "Nike" ? (
            <SiNike className={style.brand} size={40} />
          ) : product.Brand.name === "Adidas" ? (
            <SiAdidas className={style.brand} size={40} />
          ) : product.Brand.name === "Puma" ? (
            <SiPuma className={style.brand} size={40} />
          ) : product.Brand.name === "Reebok" ? (
            <SiReebok className={style.brand} size={40} />
          ) : product.Brand.name === "New Balance" ? (
            <SiNewbalance className={style.brand} size={40} />
          ) : (
            <BiError className={style.brand} size={40} />
          )}
          <MdOutlineFavoriteBorder
            className={style.iconoutline}
            size={30}
            onClick={handleFav}
            style={{ color: fav ? "#5f27cd" : "#000" }}
          />
        </div>
        <div className={style.product}>
          <img
            src={product.image}
            alt="not found"
            className={style.img}
            style={
              product.Brand.name === "Reebok"
                ? { width: "275px" }
                : { width: "210px" }
            }
          />
        </div>
        <div className={style.info}>
          <div className={style.title}>{product.name}</div>
          <div className={style.price}>${product.price}</div>
        </div>
        <Link to={`/product/${product.id}`}>
          <div className={style.details}>
            <button>View More</button>
          </div>
        </Link>
      </div>
    </div>
  );
}
