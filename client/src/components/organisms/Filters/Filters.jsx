import React, { useEffect } from "react";
import {
  filterProductByBrand,
  filterProductByCategory,
  filterProductBySize,
} from "../../../redux/actions/productActions";
import {
  getBrands,
  getCategories,
  getSizes,
} from "../../../redux/actions/otherActions";
import { useDispatch, useSelector } from "react-redux";

import style from "./Filters.module.css";

function Filters() {
  const { sizes, brands, categories } = useSelector((state) => state.other);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getSizes());
  }, [dispatch]);

  function handleFilterBrand(e) {
    dispatch(filterProductByBrand(e.target.value));
  }

  function handleFilterCategory(e) {
    dispatch(filterProductByCategory(e.target.value));
  }

  function handleFilterSizes(e) {
    dispatch(filterProductBySize(e.target.value));
  }

  return (
    <div className={style.filter_container}>
      <div className={style.order_container}></div>

      <FormControl
        fullWidth
        size="small"
        className={style.filter}
        sx={{ marginBottom: "1rem" }}
      >
        <InputLabel id="brand">Brand</InputLabel>
        <Select
          labelId="brand"
          label="BRAND"
          onChange={handleFilterBrand}
          sx={{ backgroundColor: "#fff" }}
        >
          <MenuItem value="All">All</MenuItem>
          {brands.length > 0 &&
            brands.map((brand, i) => (
              <MenuItem key={i} value={brand.name}>
                {brand.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        size="small"
        className={style.filter}
        sx={{ marginBottom: "1rem" }}
      >
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          label="CATEGORY"
          onChange={handleFilterCategory}
          sx={{ backgroundColor: "#fff" }}
        >
          <MenuItem value="All">All</MenuItem>
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
        <Select
          labelId="size"
          label="SIZE"
          onChange={handleFilterSizes}
          sx={{ backgroundColor: "#fff" }}
        >
          <MenuItem value="All">All</MenuItem>
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

