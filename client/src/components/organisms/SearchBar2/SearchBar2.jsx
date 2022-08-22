import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { searchProduct } from "../../../redux/actions/productActions.js";
import { useDispatch } from "react-redux";
import style from './SearchBar2.module.css'

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
      variant="standard"
      onChange={handleChange}
      value={search}
      autoComplete="off"
    />
    <Button type="submit">Search</Button>
  </form>
  )
}
