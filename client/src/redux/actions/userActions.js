import { GET_LOGED_USER, GET_ALL_USERS } from "../../utils/reduxVars";
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
export function getAllUsers() {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/user`);
      dispatch({ type: GET_ALL_USERS, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

}
