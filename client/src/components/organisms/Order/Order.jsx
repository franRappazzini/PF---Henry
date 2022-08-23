import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

import style from "./Order.module.css";
import { useDispatch } from "react-redux";

function Order() {
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setOrder(e.target.value);
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
          onChange={handleChange}
          value={order}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="ascending">Price Ascending</MenuItem>
          <MenuItem value="descending">Price Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
export default Order;
