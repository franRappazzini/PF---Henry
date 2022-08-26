import { GET_LOGED_USER, GET_ALL_USERS } from "../../utils/reduxVars";

const initialState = {
  users: [],
  logedUser: {},
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
    default:
      return state;
  }
}

