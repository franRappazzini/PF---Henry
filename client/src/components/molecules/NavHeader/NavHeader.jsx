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
    isAuthenticated && dispatch(getLogedUser(user));
    console.log(user);
    console.log(logedUser);
  }, [dispatch, isAuthenticated, user]);

  return (
    <nav className={style.nav}>
      <ul className={style.ul_nav}>
        <div className={style.adminOptionsContainer}>
          {logedUser && logedUser.isAdmin && (
            <>
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
            </>
          )}
              <li className={style.li_nav}>
                <NavLink
                  to={"/purchases"}
                  className={({ isActive }) =>
                    isActive ? style.a_nav_active : style.a_nav
                  }
                >
                  Purchase History
                </NavLink>
              </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavHeader;
