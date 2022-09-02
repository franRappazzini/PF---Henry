import { GET_BRANDS, GET_CATEGORIES, GET_SIZES, savePurchase, SAVE_PURCHASE } from "../actions/otherActions";

const initialState = {
  brands: [],
  categories: [],
  sizes: [],
  savePurchase:[],
};

export function otherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BRANDS:
      return { ...state, brands: action.payload };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case GET_SIZES:
      return { ...state, sizes: action.payload };

    case SAVE_PURCHASE:
      let aux = action.payload
      console.log("aux")
      console.log(aux)
      return{
        ...state,
        savePurchase:aux,
      }

    default:
      return state;
  }
}
