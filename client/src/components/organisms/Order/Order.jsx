import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import React from "react";
import { filterProductByPrice } from "../../../redux/actions/productActions";
import style from "./Order.module.css";
import { useDispatch } from "react-redux";

function Order() {
  const dispatch = useDispatch();

  function handleFilterPrice(e) {
    dispatch(filterProductByPrice(e.target.value));
  }

  return (
    <div className={style.order_container}>
      <FormControl
        size="small"
        className={style.order}
        sx={{ minWidth: window.innerWidth > 600 ? "6rem" : "100%" }}
      >
        <InputLabel id="order">Order</InputLabel>
        <Select
          labelId="order"
          id="demo-simple-select"
          label="ORDER"
          onChange={handleFilterPrice}
          sx={{ backgroundColor: "white" }}
        >
          <MenuItem value={"ascending"}>Price Ascending</MenuItem>
          <MenuItem value={"descending"}>Price Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
export default Order;
