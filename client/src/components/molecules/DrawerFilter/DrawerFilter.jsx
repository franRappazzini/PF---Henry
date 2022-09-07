import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SwipeableDrawer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getBrands, getCategories, getSizes } from "../../../redux/actions/otherActions";
import { useDispatch, useSelector } from "react-redux";

import { FilterList } from "@mui/icons-material";
import Order from "../../organisms/Order/Order";
import { brands, sizes } from "../../../utils/data";
import style from "./DrawerFilter.module.css";

function DrawerFilter({ filters, setFilters }) {
  const [open, setOpen] = useState(false);
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

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <section className={style.drawer_container}>
      <IconButton onClick={handleToggle}>
        <FilterList />
      </IconButton>
      <SwipeableDrawer anchor={"right"} open={open} onClose={handleClose} onOpen={handleOpen}>
        <Box className={style.drawer}>
          <Order filters={filters} setFilters={setFilters} />

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
              name="brand"
              onChange={handleFilter}
              value={brand}
            >
              <MenuItem value="">All</MenuItem>
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
        </Box>
      </SwipeableDrawer>
    </section>
  );
}

export default DrawerFilter;
