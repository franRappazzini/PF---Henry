import React from "react";
import { TextField } from "@mui/material";
import style from "./SearchBar2.module.css";

export default function SearchBar2({ filters, setFilters, label }) {
  function handleFilter(e) {
    setFilters({ ...filters, name: e.target.value });
  }

  return (
    <div className={style.search_container}>
      <TextField
        label={label}
        variant="outlined"
        onChange={handleFilter}
        value={filters?.name?filters.name:null}
        autoComplete="off"
        size="small"
      />
    </div>
  );
}
