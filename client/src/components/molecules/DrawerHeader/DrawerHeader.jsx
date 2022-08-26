import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore, Menu } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { getLogedUser } from "../../../redux/actions/userActions";
import style from "./DrawerHeader.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function DrawerHeader() {
  const [burger, setBurger] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const { logedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    isAuthenticated && dispatch(getLogedUser(user));
  }, [dispatch, isAuthenticated, user]);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <section className={style.drawer_container}>
      <IconButton onClick={() => setBurger(true)} color="secondary">
        <Menu />
      </IconButton>
      <Drawer anchor={"left"} open={burger} onClose={() => setBurger(false)}>
        <Box className={style.drawer}>
          <List>
            <ListItemButton>
              <Link
                className={style.link}
                to={"/"}
                onClick={() => setBurger(false)}
              >
                <ListItemText primary="Home" />
              </Link>
            </ListItemButton>
            {logedUser && logedUser.isAdmin && (
              <ListItemButton>
                <Link
                  className={style.link}
                  to={"/create_product"}
                  onClick={() => setBurger(false)}
                >
                  <ListItemText primary="Create Product" />
                </Link>
              </ListItemButton>
            )}
            <ListItemButton>
              <Link to={"/dashboard"} onClick={() => setBurger(false)}>
                <ListItemText primary="Dashboard" />
              </Link>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Shopping Cart" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Categories" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Category 1" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Category 2" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Category 3" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </section>
  );
}

export default DrawerHeader;
