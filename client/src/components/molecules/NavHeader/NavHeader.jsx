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
              isActive ? style.a_nav : style.a_nav_active
            }
          >
            Categoria 1
          </NavLink>
        </li>
        <li className={style.li_nav}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? style.a_nav : style.a_nav_active
            }
          >
            Categoria 2
          </NavLink>
        </li>
        <li className={style.li_nav}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? style.a_nav : style.a_nav_active
            }
          >
            Categoria 3
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavHeader;
