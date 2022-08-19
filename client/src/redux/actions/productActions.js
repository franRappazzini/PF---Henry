import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  FILTER_BY_SIZE,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_NAME,
} from "../../utils/reduxVars";

import axios from "axios";

export function getAllProducts() {
  console.log('getAllProducts ACTION');
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/product");
      dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getProduct(id) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/product/${id}`);
      dispatch({ type: GET_PRODUCT, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export async function createProduct(product) {
  try {
    await axios.post("http://localhost:3001/product", product);
  } catch (err) {
    return err;
  }
}

<<<<<<< HEAD
export function searchProduct(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/product?name=${name}`);
=======

export  function searchProduct(name){
  return async function(dispatch){
  try { 
      var json = await axios.get(`http://localhost:3001/product?name=${name}`)
>>>>>>> development
      return dispatch({
        type: GET_PRODUCT_NAME,
        payload: json.data,
      });
    } catch (err) {
      return err;
    }
  };
}

// filtrados (por marca, categoría y talles)
export function filterProductByBrand(payload) {
  return {
    type: FILTER_BY_BRAND,
    payload,
  };
}
export function filterProductByCategory(payload) {
  return {
    type: FILTER_BY_CATEGORY,
    payload,
  };
}
export function filterProductBySize(payload) {
  return {
    type: FILTER_BY_SIZE,
    payload,
  };
}
export function filterProductByPrice(payload) {
  return {
    type: FILTER_BY_PRICE,
    payload,
  };
}
