import {
  AccountCircle,
  FavoriteBorder,
  ShoppingCart,
} from "@mui/icons-material";
import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";

import style from "./Header.module.css";

function Header() {
  const [burger, setBurger] = useState();

  function toggleDrawer(set) {
    setBurger(set);
  }

  return (
    <header className={style.header}>
      {/* <Button onClick={() => toggleDrawer(true)}>BURGER</Button>
      <Drawer anchor={"left"} open={burger} onClose={() => toggleDrawer(false)}>
        <ul>
          <li>hola</li>
          <li>hola</li>
          <li>hola</li>
        </ul>
      </Drawer> */}
      <h2>LOGO</h2>

      <nav>
        <ul className={style.ul_nav}>
          <li>
            <Button>Categoria 1</Button>
          </li>
          <li>
            <Button>Categoria 2</Button>
          </li>
          <li>
            <Button>Categoria 3</Button>
          </li>
        </ul>
      </nav>

      <section>
        <FavoriteBorder />
        <AccountCircle />
        <ShoppingCart />
      </section>
    </header>
  );
}

export default Header;
