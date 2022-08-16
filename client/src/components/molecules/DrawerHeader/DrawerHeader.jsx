import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Inbox,
  Menu,
  StarBorder,
} from "@mui/icons-material";
import React, { useState } from "react";

import style from "./DrawerHeader.module.css";

function DrawerHeader() {
  const [burger, setBurger] = useState(false);
  const [open, setOpen] = useState(false);

  function toggleDrawer(set) {
    setBurger(set);
  }

  function handleClick() {
    setOpen(!open);
  }

  return (
    <section className={style.drawer_container}>
      <IconButton onClick={() => toggleDrawer(true)} color="primary">
        <Menu />
      </IconButton>
      <Drawer anchor={"left"} open={burger} onClose={() => toggleDrawer(false)}>
        <Box className={style.drawer}>
          <List>
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
