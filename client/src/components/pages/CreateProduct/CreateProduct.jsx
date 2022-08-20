import FormCreateProduct from "../../organisms/FormCreateProduct/FormCreateProduct";
import React from "react";
import style from "./CreateProduct.module.css";

function CreateProduct() {
  return (
    <main className={style.form_container}>
      <FormCreateProduct />
    </main>
  );
}

export default CreateProduct;
