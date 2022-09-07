import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { brands, sizes } from "../../../utils/data";
import { getBrands, getCategories, getSizes } from "../../../redux/actions/otherActions";
import { useDispatch, useSelector } from "react-redux";

import style from "./Filters.module.css";

function Filters({ filters, setFilters }) {
  const { brand, category, size } = filters;
  const { categories } = useSelector((state) => state.other);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    // dispatch(getBrands());
    // dispatch(getSizes());
  }, [dispatch]);

  function handleFilter(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <div className={style.filter_container}>
      <FormControl fullWidth size="small" className={style.filter} sx={{ marginBottom: "1rem" }}>
        <InputLabel id="brand">Brand</InputLabel>
        <Select labelId="brand" label="BRAND" name="brand" onChange={handleFilter} value={brand}>
          <MenuItem value="">All</MenuItem>
          {brands.length > 0 &&
            brands.map((brand, i) => (
              <MenuItem key={i} value={brand.name}>
                {brand.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" className={style.filter} sx={{ marginBottom: "1rem" }}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          label="CATEGORY"
          name="category"
          onChange={handleFilter}
          value={category}
        >
          <MenuItem value="">All</MenuItem>
          {categories.length > 0 &&
            categories.map((cat, i) => (
              <MenuItem key={i} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" className={style.filter}>
        <InputLabel id="size">Size</InputLabel>
        <Select labelId="size" label="SIZE" name="size" onChange={handleFilter} value={size}>
          <MenuItem value="">All</MenuItem>
          {sizes.length > 0 &&
            sizes.map((size, i) => (
              <MenuItem key={i} value={size.size}>
                {size.size}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
export default Filters;
