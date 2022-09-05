import axios from "axios";
import { DELETE_REVIEW } from "../../utils/reduxVars";

export async function createReview(review) {
    try {
      await axios.post("/rating", review);
    } catch (err) {
      return err;
    }
  }

  export function deleteReview(id) {
    return async (dispatch) => {
      try {
        const res = await axios.delete(`/rating/${id}`);
        dispatch({ type: DELETE_REVIEW, payload: res.data });
      } catch (err) {
        console.log(err);
      }
    };
  }