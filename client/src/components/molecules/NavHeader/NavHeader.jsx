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
          <div className={style.adminOptionsContainer}>
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
            <li className={style.li_nav}>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                isActive ? style.a_nav_active : style.a_nav
                }
                >
                Dashboard
              </NavLink>
            </li>
          </div>
          
          
        )} 
      </ul>
    </nav>
  );
}

export default NavHeader;
