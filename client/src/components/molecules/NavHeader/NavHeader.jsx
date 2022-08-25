import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import { getLogedUser } from "../../../redux/actions/userActions";
import style from "./NavHeader.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function NavHeader() {
  const { isAuthenticated, user } = useAuth0();
  const { logedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    isAuthenticated && dispatch(getLogedUser(user.email));
  }, [dispatch, isAuthenticated, user?.email]);

  return (
    <nav className={style.nav}>
      <ul className={style.ul_nav}>
        {logedUser?.isAdmin && (
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
