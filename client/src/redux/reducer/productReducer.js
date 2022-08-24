import {
  ADD_FAVORITES,
  FILTERS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_NAME,
  REMOVE_FAVORITES,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../../utils/reduxVars.js";

const initialState = {
  products: [],
  // filteredProducts: [],
  productDetail: {},
  favorites: [],
  cartProducts: [],
};

export function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        // filteredProducts: action.payload,
      };
    case GET_PRODUCT:
      return { ...state, productDetail: action.payload };
    case ADD_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.concat(action.payload),
      };
      case ADD_TO_CART:
        console.log('product from reducer: ', action.payload);
        return {
          ...state,
          cartProducts: state.cartProducts.concat(action.payload)
        };
        case REMOVE_FROM_CART:
          return {
            ...state,
            cartProducts: state.cartProducts.filter(prod=> prod.id!==action.payload),
          };
    case REMOVE_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((prod) => prod.id !== action.payload),
      };
    case GET_PRODUCT_NAME:
      return { ...state, products: action.payload };
    case FILTERS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
}
