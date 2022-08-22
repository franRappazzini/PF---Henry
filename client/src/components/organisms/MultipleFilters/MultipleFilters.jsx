import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

export default function MultipleFilters() {
    let { brands, categories, sizes} = useSelector((state) => state.other);
    let dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getCategories());
      dispatch(getBrands());
      dispatch(getSizes());
    }, [dispatch]);
  
    function handleFilters(e){
        sizes.filter(size=>size.size===e.target.value).length
        ? dispatch(filterProductBySize(e.target.value))
        : brands.filter(brand=>brand.name===e.target.value).length
        ? dispatch(filterProductByBrand(e.target.value))
        : dispatch(filterProductByCategory(e.target.value))
    }
  
  return (
    <div>
        <FormControl sx={{ m: 1.4, minWidth: 120}} size="small">
        <InputLabel htmlFor="grouped-select">Filters</InputLabel>
        <Select defaultValue="" label="Filters"onChange={handleFilters}>
          
          <ListSubheader>BRAND</ListSubheader>
          <MenuItem value='All'>All</MenuItem>
          { brands.length &&
            brands.map((brand, i) => (
              <MenuItem key={i} value={brand.name}>
                {brand.name}
              </MenuItem>
            ))}

          <ListSubheader>CATEGORY</ListSubheader>
          <MenuItem value='All'>All</MenuItem>
          { categories.length &&
            categories.map((categorie, i) => (
              <MenuItem key={i} value={categorie.name}>
                {categorie.name}
              </MenuItem>
            ))}

          <ListSubheader>SIZE</ListSubheader>
          <MenuItem value='All'>All</MenuItem>
          { sizes.length &&
            sizes.map((size, i) => (
              <MenuItem key={i} value={size.size}>
                {size.size}
              </MenuItem>
            ))}
            
        </Select>
      </FormControl>
    </div>
  )
}
