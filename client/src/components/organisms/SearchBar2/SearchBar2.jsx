import React from "react";
import { TextField } from "@mui/material";
import style from "./SearchBar2.module.css";

export default function SearchBar2({ filters, setFilters }) {
  function handleFilter(e) {
    setFilters({ ...filters, name: e.target.value });
  }

  return (
    <div className={style.search_container}>
      <TextField
        label="Search model"
        variant="outlined"
        onChange={handleFilter}
        value={filters.name}
        autoComplete="off"
        size="small"
      />
    </div>
  );
}
