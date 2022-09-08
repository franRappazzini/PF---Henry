import { Autocomplete, TextField } from "@mui/material";

import React from "react";
import style from "./SearchBar2.module.css";

export default function SearchBar2({ filterProds, label, prodSearched, setProdSearched }) {
  function handleFilter(e) {
    // setFilters({ ...filters, name: e.target.value });
    setProdSearched(e.target.value);
  }

  return (
    <div className={style.search_container}>
      <Autocomplete
        freeSolo
        disableClearable
        options={filterProds().map((prod) => prod.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            onChange={handleFilter}
            value={prodSearched}
            autoComplete="off"
            size="small"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            sx={{ width: "100%" }}
          />
        )}
        sx={{ width: "100%" }}
      />
      {/* <TextField
        label={label}
        variant="outlined"
        onChange={handleFilter}
        value={prodSearched}
        autoComplete="off"
        size="small"
      /> */}
    </div>
  );
}
