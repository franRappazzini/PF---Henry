import { MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBrands } from "../../../redux/actions/otherActions";
import style from "./InputsFormCreate.module.css";

function InputsFormCreate({ product, setProduct, image, setImage }) {
  const { brands } = useSelector((state) => state.other);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function handleChangeImage(e) {
    setImage(e.target.files[0]);
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
        {brands.length > 0 &&
          brands.map((brand) => (
            <MenuItem key={brand.name} value={brand.name}>
              {brand.name}
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
        type="file"
        color="secondary"
        onChange={handleChangeImage}
        // value={product.image}
        required
      />
    </section>
  );
}

export default InputsFormCreate;
