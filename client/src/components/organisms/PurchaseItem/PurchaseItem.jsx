import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import React from "react";
import style from "./PurchaseItem.module.css";

export default function PurchaseItem({ product, statee }) {
  console.log('Prod from purchase item',product);
  return (
    <div>
      {typeof product === "object" ? (
        <div className={style.itemContainer}>
          <div className={style.imageContainer}>
            <img src={product.productData.image} alt="not found" className={style.image} />
          </div>

          <div className={style.infoContainer}>
            <div className={statee === "Completed" ? style.status : style.status2}>
              {statee}
            </div>
            <div className={style.shipInfo}>
              {statee === "Completed" ? "Delivered" : "Processing"}
            </div>
            <div className={style.name}>
              {product.productData.name} (Size: {product.SizeId.size})
            </div>
            <div className={style.name}>{product.productData.price}$</div>
            <div className={style.units}>Amount: {product.Product_Bought.amount}</div>
          </div>

          <div className={style.buttonContainer}>
            <Link to={`/product/${product.productData.id}`} style={{ textDecoration: "none" }}>
              <Button variant="contained">Purchase Again</Button>
            </Link>
          </div>
        </div>
      ) : (
        <h1>Loading Items</h1>
      )}
    </div>
  );
}
