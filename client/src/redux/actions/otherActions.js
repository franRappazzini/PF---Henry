import axios from "axios";

export const GET_BRANDS = "GET_BRANDS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_SIZES = "GET_SIZES";

export function getBrands() {
  return async (dispatch) => {
    try {
      const res = await axios.get("/brand");
      dispatch({ type: GET_BRANDS, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getCategories() {
  return async (dispatch) => {
    try {
      const res = await axios.get("/category");
      dispatch({ type: GET_CATEGORIES, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getSizes() {
  return async (dispatch) => {
    try {
      const res = await axios.get("/size");
      dispatch({ type: GET_SIZES, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export const loadCategory = (category) => {
  return async (dispatch) => {
    axios.post("/category", category);
  };
};
