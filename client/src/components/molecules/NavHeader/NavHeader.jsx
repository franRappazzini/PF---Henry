import { NavLink } from "react-router-dom";
import React from "react";
import style from "./NavHeader.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function NavHeader() {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className={style.nav}>
      <ul className={style.ul_nav}>
        {isAuthenticated && (
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
        )} 
      </ul>
    </nav>
  );
}

export default NavHeader;
