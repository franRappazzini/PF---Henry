import React, { useState } from "react";

import DialogSizesCreate from "../../molecules/DialogSizesCreate/DialogSizesCreate";
import InputsFormCreate from "../../molecules/InputsFormCreate/InputsFormCreate";
import { LoadingButton } from "@mui/lab";
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
  const [newCategories, setNewCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const swal = withReactContent(Swal);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (validations()) return swal.fire("Error..", validations(), "error");

    setLoading(true);

    try {
      // subo imagen a cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "gsx0rfx1");
      const imgRes = await axios.post("https://api.cloudinary.com/v1_1/dnwamkq58/upload", formData);

      const newProduct = {
        ...product,
        image: imgRes.data.url,
        category: selectedCategories,
        size: selectedSizes,
      };

      console.log(newProduct);
      // creo el producto
      const res = await axios.post("/product", newProduct);
      console.log(res);
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
          if (result.isConfirmed) navigate(`/product/${res.data.id}`);
        });
    } catch (err) {
      setLoading(false);
      return swal.fire("Error..", err.message, "error");
    }

    setProduct({ name: "", brand: "", price: "" });
    setSelectedCategories([]);
    setSelectedSizes([]);
    setLoading(false);
  }

  function validations() {
    // const imageRegex = /^.+\.(jpe?g|gif|png)$/i;
    if (!product.name.length) return "error name";
    if (product.brand === "") return "You must choose a brand";
    if (product.price <= 0) return "Price must be greater than $0";
    // if (!image.match(imageRegex)) return "Wrong image format";
    if (!selectedCategories.length) return "You must choose at least one category";
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
          newCategories={newCategories}
          setNewCategories={setNewCategories}
        />

        <DialogSizesCreate setSelectedSizes={setSelectedSizes} selectedSizes={selectedSizes} />
      </section>

      <LoadingButton loading={loading} type="submit" variant="outlined">
        Submit
      </LoadingButton>
    </form>
  );
}

export default FormCreateProduct;
