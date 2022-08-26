import { GET_LOGED_USER } from "../../utils/reduxVars";
import axios from "axios";

export function getLogedUser(email) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/user/${email}`);
      dispatch({ type: GET_LOGED_USER, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}
