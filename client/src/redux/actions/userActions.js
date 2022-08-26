import { GET_LOGED_USER } from "../../utils/reduxVars";
import axios from "axios";

export function getLogedUser(user) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/user/${user.email}`, user);
      dispatch({ type: GET_LOGED_USER, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}
