import React, { useState } from "react";

import { Button } from "@mui/material";
import DialogSizesCreate from "../../molecules/DialogSizesCreate/DialogSizesCreate";
import InputsFormCreate from "../../molecules/InputsFormCreate/InputsFormCreate";
import SelectCategoryCreate from "../../molecules/SelectCategoryCreate/SelectCategoryCreate";
import Swal from "sweetalert2";
import axios from "axios";
import style from "./FormCreateProduct.module.css";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";

const instanceProduct = { name: "", brand: "", price: "" };

function FormCreateProduct() {
  const [product, setProduct] = useState(instanceProduct);
  const [image, setImage] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const swal = withReactContent(Swal);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (validations()) {
      swal.fire("Error..", validations(), "error");
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

    console.log(res);

    // TODO corergir esto que no esta bien el .status
    console.log(res.response?.status);
    if (res.response?.status === 400) {
      swal.fire("Error..", res.message, "error");
      return;
    }

    swal
      .fire({
        icon: "success",
        title: "Producto creado",
        html: "Deseas ver el producto creado? O quieres seguir creando mas?",
        showDenyButton: true,
        confirmButtonText: "Ver producto",
        denyButtonText: `Seguir creando`,
        denyButtonColor: "grey",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate(`/product/${res.data.id}`);
        }
      });
    setProduct({ name: "", brand: "", price: "" });
    setSelectedCategories([]);
    setSelectedSizes([]);
  }

  function validations() {
    const imageRegex = /^.+\.(jpe?g|gif|png)$/i;
    if (!product.name.length) return "error name";
    if (product.brand === "") return "You must choose a brand";
    if (product.price <= 0) return "Price must be greater than $0";
    // if (!image.match(imageRegex)) return "Wrong image format";
    if (!selectedCategories.length)
      return "You must choose at least one category";
    if (!selectedSizes.length) return "You must choose at least one size";
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
