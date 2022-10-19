import {
  ADD_FAVORITES,
  ADD_TO_CART,
  DELETE_PRODUCT,
  FILTERS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_NAME,
  REMOVE_FAVORITES,
  REMOVE_FROM_CART,
  PUT_PRODUCT,
  DISABLE_PRODUCT,
  ENABLE_PRODUCT,
  GET_ALL_BOUGHTS
} from "../../utils/reduxVars";

import axios from "axios";

export function getAllProducts() {
  return async (dispatch) => {
    try {
      const res = await axios.get("/product");
      dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getProduct(id) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/product/${id}`);
      dispatch({ type: GET_PRODUCT, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}
export function disableProduct(id) {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/product/disable/${id}`);
      dispatch({ type: DISABLE_PRODUCT, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}
export function enableProduct(id) {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/product/enable/${id}`);
      dispatch({ type: ENABLE_PRODUCT, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}
export function deleteProduct(id) {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/product/${id}`);
      dispatch({ type: DELETE_PRODUCT, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}
export function addFavorites(product) {

  return (dispatch) => {
    try {
      dispatch({ type: ADD_FAVORITES, payload: product });
    } catch (err) {
      console.log(err);
    }
  };
}
export  function getAllBoughts(){
  return async (dispatch)=>{
    try{
        const res = await axios.get('/bought')
        dispatch({
          type:GET_ALL_BOUGHTS,
          payload:res.data
        })
    }catch(e){
      console.log(e)
    }
  }

}
export function addToCart(prod) {
  return (dispatch) => {
    try {
      dispatch({ type: ADD_TO_CART, payload: prod });
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
    await axios.post("/product", product);
  } catch (err) {
    return err;
  }
}

export function searchProduct(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/product?name=${name}`);
      return dispatch({
        type: GET_PRODUCT_NAME,
        payload: json.data,
      });
    } catch (err) {
      return err;
    }
  };
}

export function filter(brand, category, size, by, order) {
  // const queries = `?name=${name}&brand=${brand}&category=${category}&size=${size}&by=${by}&order=${order}`;
  const queries = `?brand=${brand}&category=${category}&size=${size}&by=${by}&order=${order}`;

  return async (dispatch) => {
    try {
      const res = await axios.get("/product/" + queries);
      dispatch({ type: FILTERS, payload: res.data });
    } catch (err) {
      console.log(err.message);
    }
  };
}

export function putProduct(product, id) {
  return async (dispatch) => {
    try {
      const res = await axios.put(product, "/product/" + id)
      dispatch({type: PUT_PRODUCT, payload: res.data})
    } catch (error) {
      console.log(error)
    }
  }
}
