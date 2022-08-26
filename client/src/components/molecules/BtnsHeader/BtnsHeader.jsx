import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { FavoriteBorder, Person, ShoppingCart } from "@mui/icons-material";

import { Link } from "react-router-dom";
import React from "react";
import style from "./BtnsHeader.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { useState } from "react";

function BtnsHeader() {
  const { loginWithPopup, logout, isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let { favorites } = useSelector((state) => state.product);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogIn() {
    loginWithPopup();
    setAnchorEl(null);
  }

  return (
    <section className={style.icons_container}>
      <IconButton
        aria-label="Mi cuenta"
        color="secondary"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={style.btn_icon}
      >
        <Person />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {isAuthenticated ? (
          [
            <MenuItem key={0}>
              <Link className={style.link} to={"/profile"}>
                Profile
              </Link>
            </MenuItem>,
            <MenuItem
              key={1}
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </MenuItem>,
          ].map((item) => item)
        ) : (
          <MenuItem onClick={handleLogIn}>Log In</MenuItem>
        )}
      </Menu>

      <IconButton
        aria-label="Favoritos"
        color="secondary"
        className={style.btn_icon}
      >
        <Link to={"/favorites"}>
          <Badge badgeContent={favorites.length} color="error">
            <FavoriteBorder />
          </Badge>
        </Link>
      </IconButton>

      <IconButton
        aria-label="Carrito"
        color="secondary"
        className={style.btn_icon}
      >
        <Link to={"/cart"}>
          <Badge color="error" variant="dot" invisible={true}>
            <ShoppingCart />
          </Badge>
        </Link>
      </IconButton>
    </section>
  );
}

export default BtnsHeader;
