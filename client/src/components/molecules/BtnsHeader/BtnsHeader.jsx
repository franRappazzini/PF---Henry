import { Badge, IconButton } from "@mui/material";
import { FavoriteBorder, Person, ShoppingCart } from "@mui/icons-material";

import React from "react";
import style from "./BtnsHeader.module.css";

function BtnsHeader() {
  return (
    <section className={style.icons_container}>
      <IconButton
        aria-label="Mi cuenta"
        color="primary"
        className={style.btn_icon}
      >
        <Person />
      </IconButton>
      <IconButton
        aria-label="Favoritos"
        color="primary"
        className={style.btn_icon}
      >
        <Badge badgeContent={4} color="error">
          <FavoriteBorder />
        </Badge>
      </IconButton>
      <IconButton
        aria-label="Carrito"
        color="primary"
        className={style.btn_icon}
      >
        <Badge color="error" variant="dot" invisible={true}>
          <ShoppingCart />
        </Badge>
      </IconButton>
    </section>
  );
}

export default BtnsHeader;
