import { GET_ALL_PRODUCTS, GET_PRODUCT } from "../../utils/reduxVars";

import axios from "axios";

export function getAllProducts() {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/products");
      dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getProduct(id) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/products/${id}`);
      dispatch({ type: GET_PRODUCT, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export async function createProduct(product) {
  try {
    await axios.post("http://localhost:3001/products", product);
  } catch (err) {
    return err;
  }
}
