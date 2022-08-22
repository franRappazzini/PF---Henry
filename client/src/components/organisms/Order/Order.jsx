import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { filterProductByPrice } from "../../../redux/actions/productActions";
import { useDispatch } from "react-redux";

function Order() {
  const dispatch = useDispatch();

  function handleFilterPrice(e) {
    dispatch(filterProductByPrice(e.target.value));
  }

  return (
    <FormControl
      size="small"
      sx={{ marginTop: "0.5rem", minWidth: "6rem" }}
    >
      <InputLabel id="order">Order</InputLabel>
      <Select
        labelId="order"
        id="demo-simple-select"
        label="ORDER"
        onChange={handleFilterPrice}
        sx={{ backgroundColor: "white" }}
      >
        <MenuItem value={"ascending"}>Ascending</MenuItem>
        <MenuItem value={"descending"}>Descending</MenuItem>
      </Select>
    </FormControl>
  );
}
export default Order;
