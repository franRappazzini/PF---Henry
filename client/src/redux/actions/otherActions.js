import axios from "axios";

export const GET_BRANDS = "GET_BRANDS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_SIZES = "GET_SIZES";

export function getBrands() {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/brand");
      dispatch({ type: GET_BRANDS, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getCategories() {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/category");
      dispatch({ type: GET_CATEGORIES, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getSizes() {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/size");
      dispatch({ type: GET_SIZES, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}
