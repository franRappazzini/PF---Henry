import React from "react";
import { TextField } from "@mui/material";
import style from "./SearchBar2.module.css";

export default function SearchBar2({
  filters,
  setFilters,
  label,
  prodSearched,
  setProdSearched,
}) {
  function handleFilter(e) {
    // setFilters({ ...filters, name: e.target.value });
    setProdSearched(e.target.value);
  }

  return (
    <div className={style.search_container}>
      <TextField
        label={label}
        variant="outlined"
        onChange={handleFilter}
        value={prodSearched}
        autoComplete="off"
        size="small"
      />
    </div>
  );
}
