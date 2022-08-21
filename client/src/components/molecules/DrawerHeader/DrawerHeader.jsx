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
import React, { useState } from "react";

import { Link } from "react-router-dom";
import style from "./DrawerHeader.module.css";

function DrawerHeader() {
  const [burger, setBurger] = useState(false);
  const [open, setOpen] = useState(false);

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
              <Link to={"/"} onClick={() => setBurger(false)}>
                <ListItemText primary="Home" />
              </Link>
            </ListItemButton>
            <ListItemButton>
              <Link to={"/create_product"} onClick={() => setBurger(false)}>
                <ListItemText primary="Crear producto" />
              </Link>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Favoritos" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Carrito" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Categorias" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Categoria 1" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Categoria 2" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Categoria 3" />
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
