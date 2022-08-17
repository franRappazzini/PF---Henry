import { Button } from "@mui/material";
import React from "react";
import style from "./NavHeader.module.css";

function NavHeader() {
  return (
    <nav className={style.nav}>
      <ul className={style.ul_nav}>
        <li>
          <Button>Categoria 1</Button>
        </li>
        <li>
          <Button>Categoria 2</Button>
        </li>
        <li>
          <Button>Categoria 3</Button>
        </li>
      </ul>
    </nav>
  );
}

export default NavHeader;
