import { GET_ALL_USERS, GET_LOGED_USER } from "../../utils/reduxVars";

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
      const res = await axios.get(`/user`);
      dispatch({ type: GET_ALL_USERS, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export async function updateUser(user) {
  try {
    await axios.put(`/user/${user.currentEmail}`, user);
  } catch (err) {
    return err;
  }
}
