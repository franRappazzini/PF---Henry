import { GET_LOGED_USER, GET_ALL_USERS,GET_BOUGHTS, PUT_STATE, GET_ALL_BOUGHTS } from "../../utils/reduxVars";

const initialState = {
  users: [],
  logedUser: {},
  boughts:[],
  dashboardBoughts : []
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOGED_USER:
      return { 
        ...state,
        logedUser: action.payload 
      };
    case GET_ALL_USERS:
        return {
        ...state,
        users: action.payload,
      };
    case GET_BOUGHTS:
      return{
        ...state,
        boughts:action.payload
      }
    case PUT_STATE:
      console.log(action.payload)
      return{
        ...state
      }
    case GET_ALL_BOUGHTS:
      return {
        ...state,
        dashboardBoughts: action.payload
      }
    default:
      return state;
  }
}

