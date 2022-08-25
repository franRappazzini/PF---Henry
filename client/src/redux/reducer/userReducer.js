import { GET_LOGED_USER } from "../../utils/reduxVars";

const initialState = {
  logedUser: {},
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOGED_USER:
      return { ...state, logedUser: action.payload };
    default:
      return state;
  }
}
