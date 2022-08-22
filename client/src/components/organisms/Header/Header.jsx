import BtnsHeader from "../../molecules/BtnsHeader/BtnsHeader";
import DrawerHeader from "../../molecules/DrawerHeader/DrawerHeader";
import NavHeader from "../../molecules/NavHeader/NavHeader";
import React from "react";
import style from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={style.header}>
      <DrawerHeader />

      <Link to={'/'}>
        <img src='https://res.cloudinary.com/df7ja4fel/image/upload/v1661178406/kemba_vizt7f.png' alt="not found" className={style.logo}/>
      </Link>
      <NavHeader />

      <BtnsHeader />
    </header>
  );
}

export default Header;
