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

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function MultipleFilters({ filters, setFilters }) {
  let { brands, categories, sizes } = useSelector((state) => state.other);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getSizes());
  }, [dispatch]);

  function handleFilters(key, value) {
    setFilters({ ...filters, [key]: value });
  }

  // function handleFilters(e) {
  //   sizes.filter((size) => size.size === e.target.value).length
  //     ? dispatch(filterProductBySize(e.target.value))
  //     : brands.filter((brand) => brand.name === e.target.value).length
  //     ? dispatch(filterProductByBrand(e.target.value))
  //     : dispatch(filterProductByCategory(e.target.value));
  // }

  return (
    <div>
      {/* <GroupSelected /> */}

      <FormControl sx={{ m: 1.4, minWidth: 120 }} size="small">
        <InputLabel htmlFor="grouped-select">Filters</InputLabel>
        <Select label="Filters">
          <ListSubheader>BRAND</ListSubheader>
          <MenuItem onClick={() => handleFilters("brand", "")}>All</MenuItem>
          {brands.length > 0 &&
            brands.map((brand, i) => (
              <MenuItem
                key={i}
                onClick={() => handleFilters("brand", brand.name)}
              >
                {brand.name}
              </MenuItem>
            ))}

          <ListSubheader>CATEGORY</ListSubheader>
          <MenuItem onClick={() => handleFilters("category", "")}>All</MenuItem>
          {categories.length > 0 &&
            categories.map((category, i) => (
              <MenuItem
                key={i}
                onClick={() => handleFilters("category", category.name)}
              >
                {category.name}
              </MenuItem>
            ))}

          <ListSubheader>SIZE</ListSubheader>
          <MenuItem onClick={() => handleFilters("size", "")}>All</MenuItem>
          {sizes.length > 0 &&
            sizes.map((size, i) => (
              <MenuItem
                key={i}
                onClick={() => handleFilters("size", size.size)}
              >
                {size.size}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
