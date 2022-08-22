import BtnsHeader from "../../molecules/BtnsHeader/BtnsHeader";
import DrawerHeader from "../../molecules/DrawerHeader/DrawerHeader";
import NavHeader from "../../molecules/NavHeader/NavHeader";
import React from "react";
import style from "./Header.module.css";
import logo from "./logo_large.png"

function Header() {
  return (
    <header className={style.header}>
      <DrawerHeader />

   <div className={style.logo}>
    <img src="https://res.cloudinary.com/df7ja4fel/image/upload/v1661178406/kemba_vizt7f.png" alt="logo" width= "110px"/>
   </div>

      <NavHeader />

      <BtnsHeader />
    </header>
  );
}

export default Header;
