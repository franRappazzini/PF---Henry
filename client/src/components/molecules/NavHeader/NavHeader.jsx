import { NavLink } from "react-router-dom";
import React from "react";
import style from "./NavHeader.module.css";

function NavHeader() {
  return (
    <nav className={style.nav}>
      <ul className={style.ul_nav}>
        <li className={style.li_nav}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? style.a_nav_active : style.a_nav
            }
          >
            Home
          </NavLink>
        </li>
        <li className={style.li_nav}>
          <NavLink
            to={"/create_product"}
            className={({ isActive }) =>
              isActive ? style.a_nav_active : style.a_nav
            }
          >
            Create product
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavHeader;
