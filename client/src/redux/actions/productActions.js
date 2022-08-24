import {
  ADD_FAVORITES,
  ADD_TO_CART,
  FILTERS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_NAME,
  REMOVE_FAVORITES,
  REMOVE_FROM_CART,
} from "../../utils/reduxVars";

import axios from "axios";

export function getAllProducts() {
  console.log("getAllProducts ACTION");
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
export function addFavorites(product) {
  console.log("Product from addFavorites:", product);
  return (dispatch) => {
    try {
      dispatch({ type: ADD_FAVORITES, payload: product });
    } catch (err) {
      console.log(err);
    }
  };
}
export function addToCart(prod) {
console.log('id and size from actions :',prod);
  return (dispatch) => {
    try {
      dispatch({ type: ADD_TO_CART, payload: prod});
    } catch (err) {
      console.log(err);
    }
  };
}
export function removeFromCart(id) {
  return (dispatch) => {
    try {
      dispatch({ type: REMOVE_FROM_CART, payload: id });
    } catch (err) {
      console.log(err);
    }
  };
}
export function removeFavorites(id) {
  console.log("id from removeFavorites", id);
  return (dispatch) => {
    try {
      dispatch({ type: REMOVE_FAVORITES, payload: id });
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

export function searchProduct(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/product?name=${name}`
      );
      return dispatch({
        type: GET_PRODUCT_NAME,
        payload: json.data,
      });
    } catch (err) {
      return err;
    }
  };
}

export function filter(name, brand, category, size, by, order) {
  const queries = `?name=${name}&brand=${brand}&category=${category}&size=${size}&by=${by}&order=${order}`;

  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/product/" + queries);
      dispatch({ type: FILTERS, payload: res.data });
    } catch (err) {
      console.log(err.message);
    }
  };
}
