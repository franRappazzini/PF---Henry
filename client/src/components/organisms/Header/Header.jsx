import BtnsHeader from "../../molecules/BtnsHeader/BtnsHeader";
import DrawerHeader from "../../molecules/DrawerHeader/DrawerHeader";
import { Link } from "react-router-dom";
import NavHeader from "../../molecules/NavHeader/NavHeader";
import React from "react";
import style from "./Header.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import PurchaseHistory from "../../pages/PurchaseHistory/PurchaseHistory";

function Header() {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useAuth0();


  return (
    <header className={style.header}>
      <DrawerHeader />

      <Link to={"/"}>
        <img
          src="https://res.cloudinary.com/df7ja4fel/image/upload/v1661178406/kemba_vizt7f.png"
          alt="kemba"
          className={style.logo}
        />
      </Link>
      {/* {isAuthenticated && <Link to={"/purchases"}>Purchase</Link>} */}
      <NavHeader />

      <BtnsHeader />
    </header>
  );
}

export default Header;
