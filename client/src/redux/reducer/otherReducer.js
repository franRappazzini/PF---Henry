import { GET_BRANDS, GET_CATEGORIES, GET_SIZES } from "../actions/otherActions";

const initialState = {
  brands: [],
  categories: [],
  sizes: [],
};

export function otherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BRANDS:
      return { ...state, brands: action.payload };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case GET_SIZES:
      return { ...state, sizes: action.payload };
    default:
      return state;
  }
}
