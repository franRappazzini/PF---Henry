import { GET_ALL_USERS, GET_LOGED_USER, SAVE_ORDER_HISTORY,GET_BOUGHTS } from "../../utils/reduxVars";

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

export async function changeRole(user, isAdmin) {
  try {
    await axios.put(`/user?id=${user.id}`, { isAdmin });
  } catch (err) {
    return err;
  }
}


export async function saveOrderHistory(bought){
  console.log("En el action del BOUGHT")
  console.log(bought)
  
    try {
      const res = await axios.post(`/bought`, bought )
    } catch (err) {
      console.log(err)
    }
  
}
export async function banUser(user, isBanned) {
  try {
    await axios.put(`/user?id=${user.id}`, { isBanned });
  } catch (err) {
    return err;
  }
}

export  function getBoughts(email){
    return async (dispatch)=>{
      try{
          const res = await axios('/bought/'+email)
          console.log(res)
          dispatch({
            type:GET_BOUGHTS,
            payload:res.data
          })
      }catch(e){
        console.log(e)
      }
    }

}
