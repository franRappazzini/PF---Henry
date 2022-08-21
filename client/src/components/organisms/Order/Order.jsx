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
    <div>
      <FormControl
        fullWidth
        size="small"
        sx={{ backgroundColor: "white", marginBottom: "1rem" }}
      >
        <InputLabel id="order">ORDER</InputLabel>
        <Select
          labelId="order"
          id="demo-simple-select"
          label="ORDER"
          onChange={handleFilterPrice}
        >
          <MenuItem selected hidden disabled>
            Default
          </MenuItem>
          <MenuItem value={"ascending"}>Ascending</MenuItem>
          <MenuItem value={"descending"}>Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
export default Order;
