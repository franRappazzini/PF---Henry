import { GET_LOGED_USER, GET_ALL_USERS,GET_BOUGHTS, PUT_STATE } from "../../utils/reduxVars";

const initialState = {
  users: [],
  logedUser: {},
  boughts:[]
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
    default:
      return state;
  }
}

