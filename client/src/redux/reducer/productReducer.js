import {GET_ALL_PRODUCTS, GET_PRODUCT,GET_PRODUCT_NAME} from "../../utils/reduxVars.js"

const initialState = {
  products:[],
  productDetail:{}
};

export function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return{
        ...state,
        products:action.payload
      }
      case GET_PRODUCT:
        return{
          ...state,
          productDetail:action.payload
        }
      case GET_PRODUCT_NAME:
        return{
          ...state,
          products:action.payload
        }
      
    default:
      return state;
  }
}
