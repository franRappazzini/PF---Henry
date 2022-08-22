import React, { useState } from "react";

import { Button } from "@mui/material";
import DialogSizesCreate from "../../molecules/DialogSizesCreate/DialogSizesCreate";
import InputsFormCreate from "../../molecules/InputsFormCreate/InputsFormCreate";
import SelectCategoryCreate from "../../molecules/SelectCategoryCreate/SelectCategoryCreate";
import Swal from "sweetalert2";
import axios from "axios";
import style from "./FormCreateProduct.module.css";
import withReactContent from "sweetalert2-react-content";

const instanceProduct = {
  name: "",
  brand: "",
  price: "",
};

function FormCreateProduct() {
  const [product, setProduct] = useState(instanceProduct);
  const [image, setImage] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const swal = withReactContent(Swal);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(image);

    if (validations()) {
      alert(validations());
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "gsx0rfx1");
    const imgRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dnwamkq58/upload",
      formData
    );
    if (imgRes.response?.data.error) {
      swal.fire("Error..", imgRes.message, "error");
      return;
    }

    const newProduct = {
      ...product,
      image: imgRes.data.url,
      category: selectedCategories,
      size: selectedSizes,
    };

    const res = await axios.post("http://localhost:3001/product", newProduct);

    // TODO corergir esto que no esta bien el .status
    console.log(res.response?.status);
    if (res.response?.status === 400) {
      swal.fire("Error..", res.message, "error");
      return;
    }
    swal.fire("Success!", "Product added!", "success");
    setProduct({ name: "", brand: "", price: "", image: "" });
    setSelectedCategories([]);
    setSelectedSizes([]);
  }

  function validations() {
    // TODO ver bien las validaciones
    const urlExpression = "/(http(s?):)([/|.|w|s|-])*.(?:jpg|gif|png)/g";
    // if (!product.name.match(/^[a-zA-Z\s]*$/)) return "error name";
    if (!product.name.length) return "error name";
    if (product.brand === "") return "error brand";
    if (product.price <= 0) return "error price";
    if (product.price <= 0) return "error price";
    // if (!product.image.match(urlExpression)) return "error image";
    if (!selectedCategories.length) return "error category";
    if (!selectedSizes.length) return "error sizes";
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <InputsFormCreate
        product={product}
        setProduct={setProduct}
        image={image}
        setImage={setImage}
      />

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
