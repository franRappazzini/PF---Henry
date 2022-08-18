import React, { useState } from "react";

import { Button } from "@mui/material";
import DialogSizesCreate from "../../molecules/DialogSizesCreate/DialogSizesCreate";
import InputsFormCreate from "../../molecules/InputsFormCreate/InputsFormCreate";
import SelectCategoryCreate from "../../molecules/SelectCategoryCreate/SelectCategoryCreate";
import axios from "axios";
import style from "./FormCreateProduct.module.css";

const instanceProduct = {
  name: "",
  brand: "",
  price: 0,
  image: "",
};

function FormCreateProduct() {
  const [product, setProduct] = useState(instanceProduct);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (validations()) {
      alert(validations());
      return;
    }

    const newProduct = {
      ...product,
      category: selectedCategories,
      size: selectedSizes,
    };

    console.log(newProduct);

    const res = await axios.post("http://localhost:3001/product", newProduct);

    // TODO corergir esto que no esta bien el .status
    if (res.status === 400) {
      alert("Error al crear el producto");
      return;
    }

    setProduct({ name: "", brand: "", price: 0, image: "" });
    setSelectedCategories([]);
    setSelectedSizes([]);
  }

  function validations() {
    const urlExpression = "/(http(s?):)([/|.|w|s|-])*.(?:jpg|gif|png)/g";
    if (!product.name.match(/^[a-zA-Z\s]*$/)) return "error name";
    if (product.brand === "") return "error brand";
    if (product.price <= 0) return "error price";
    if (product.price <= 0) return "error price";
    // if (!product.image.match(urlExpression)) return "error image";
    if (!selectedCategories.length) return "error category";
    if (!selectedSizes.length) return "error sizes";
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <InputsFormCreate product={product} setProduct={setProduct} />

      <section className={style.container}>
        <SelectCategoryCreate
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <DialogSizesCreate
          setSelectedSizes={setSelectedSizes}
          selectedSizes={selectedSizes}
        />
      </section>

      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </form>
  );
}

export default FormCreateProduct;
