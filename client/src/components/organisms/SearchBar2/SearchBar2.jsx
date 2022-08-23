import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";

import { Search } from "@mui/icons-material";
import { searchProduct } from "../../../redux/actions/productActions.js";
import style from "./SearchBar2.module.css";
import { useDispatch } from "react-redux";

export default function SearchBar2() {
  let [search, setSearch] = useState("");
  let dispatch = useDispatch();

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    dispatch(searchProduct(search));
  }
  return (
    <form onSubmit={handleSearch} className={style.search_container}>
      <TextField
        label="Product"
        variant="outlined"
        onChange={handleChange}
        value={search}
        autoComplete="off"
        size="small"
      />
      <IconButton color="secondary" type="submit">
        <Search />
      </IconButton>
    </form>
  );
}
