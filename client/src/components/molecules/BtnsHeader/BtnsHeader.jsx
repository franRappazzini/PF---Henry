import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { FavoriteBorder, Person, ShoppingCart } from "@mui/icons-material";

import { Link } from "react-router-dom";
import React from "react";
import style from "./BtnsHeader.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

function BtnsHeader() {
  const { loginWithPopup, logout, isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {isAuthenticated ? (
          <>
            <MenuItem>
              <Link to={"/profile"}>Profile</Link>
            </MenuItem>
            <MenuItem
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleLogIn}>Log In</MenuItem>
        )}
      </Menu>
      <IconButton
        aria-label="Favoritos"
        color="secondary"
        className={style.btn_icon}
      >
        <Badge badgeContent={4} color="error">
          <FavoriteBorder />
        </Badge>
      </IconButton>
      <IconButton
        aria-label="Carrito"
        color="secondary"
        className={style.btn_icon}
      >
        <Badge color="error" variant="dot" invisible={true}>
          <ShoppingCart />
        </Badge>
      </IconButton>
    </section>
  );
}

export default BtnsHeader;
