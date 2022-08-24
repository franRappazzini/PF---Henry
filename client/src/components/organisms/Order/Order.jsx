import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import React from "react";
import style from "./Order.module.css";

function Order({ filters, setFilters }) {
  function handleChange(e) {
    setFilters({ ...filters, order: { by: "price", order: e.target.value } });
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
          label="ORDER"
          onChange={handleChange}
          value={filters.order.order}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="ASC">Price Ascending</MenuItem>
          <MenuItem value="DESC">Price Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
export default Order;
