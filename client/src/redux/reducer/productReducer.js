import {GET_ALL_PRODUCTS, GET_PRODUCT,GET_PRODUCT_NAME,FILTER_BY_BRAND,FILTER_BY_PRICE} from "../../utils/reduxVars.js"

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
      case FILTER_BY_BRAND:
        var product=state.products
        const brandFiltered= action.payload==='all' ? product : product.filter(el=>el.brand===action.payload)
        return{
          ...state,
          products:brandFiltered
        }
        case FILTER_BY_CATEGORY:
        var product=state.products
        const categoryFiltered= action.payload==='all' ? product : product.filter(el=>el.category===action.payload)
        return{
          ...state,
          products:categoryFiltered
        }
        case FILTER_BY_SIZE:
          var product=state.products
          const sizeFiltered= action.payload==='all' ? product : product.filter(el=>el.size===action.payload)
          return{
            ...state,
            products:sizeFiltered
          }

          case FILTER_BY_PRICE:
        let sortPayload= action.payload==='ascending'? 
        state.products.sort(function (a,b){ //el sort ordena mueve para la izq o der
          if (a.price>b.price) { //el price a es mayor q b? si lo es devuelvo 1 
            return 1;
          }
          if (b.price>a.price) {
            return -1;
          }
          return 0;
        }) 
        :
        state.products.sort(function (a,b){
          if (a.price>b.price) {
            return -1
          }
          if (b.price>a.price) {
            return 1
          }
        })
        return {
        ...state,
        products:sortPayload
        }

    default:
      return state;
  }
}
