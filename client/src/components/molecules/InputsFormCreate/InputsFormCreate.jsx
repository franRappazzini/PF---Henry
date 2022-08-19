import { MenuItem, TextField } from "@mui/material";

import React from "react";
import style from "./InputsFormCreate.module.css";

function InputsFormCreate({ product, setProduct }) {
  const brands = ["Nike", "Adidas", "Reebok", "Puma"]; // TODO deberia venir de la db

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }
  return (
    <section className={style.inputs_container}>
      <TextField
        label="Name"
        variant="standard"
        autoComplete="off"
        name="name"
        color="secondary"
        onChange={handleChange}
        value={product.name}
        required
      />

      <TextField
        label="Brand"
        select
        variant="standard"
        color="secondary"
        sx={{ minWidth: 100 }}
        name="brand"
        onChange={handleChange}
        value={product.brand}
        required
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {brands.map((brand) => (
          <MenuItem key={brand} value={brand}>
            {brand}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Price"
        variant="standard"
        autoComplete="off"
        name="price"
        type="number"
        color="secondary"
        onChange={handleChange}
        value={product.price}
        required
      />

      <TextField
        label="Image"
        variant="standard"
        autoComplete="off"
        name="image"
        type="text"
        color="secondary"
        onChange={handleChange}
        value={product.image}
        required
      />
    </section>
  );
}

export default InputsFormCreate;
