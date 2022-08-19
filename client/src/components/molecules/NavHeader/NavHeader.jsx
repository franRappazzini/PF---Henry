import { Link, NavLink } from "react-router-dom";

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
            Crear Producto
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

        <li className={style.li_nav_hover}>
          Mas categorias
          <ul className={style.sub_ul}>
            <li className={style.sub_li}>
              <Link to={"/"} className={style.a_nav}>
                Categoria 4
              </Link>
            </li>
            <li className={style.sub_li}>
              <Link to={"/"} className={style.a_nav}>
                Categoria 5
              </Link>
            </li>
            <li className={style.sub_li}>
              <Link to={"/"} className={style.a_nav}>
                Categoria 6
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default NavHeader;
