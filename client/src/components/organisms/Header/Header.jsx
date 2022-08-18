import BtnsHeader from "../../molecules/BtnsHeader/BtnsHeader";
import DrawerHeader from "../../molecules/DrawerHeader/DrawerHeader";
import NavHeader from "../../molecules/NavHeader/NavHeader";
import React from "react";
import style from "./Header.module.css";

function Header() {
  return (
    <header className={style.header}>
      <DrawerHeader />

      <h2 className={style.logo}>LOGO</h2>

      <NavHeader />

      <BtnsHeader />
    </header>
  );
}

export default Header;
