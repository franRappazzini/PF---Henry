import axios from "axios";
import { DELETE_REVIEW } from "../../utils/reduxVars";

export async function createReview(review) {
    try {
      await axios.post("/rating", review);
    } catch (err) {
      console.log("hubo error en post")
      return err;
    }
  }

  export async function deleteReview(id) {
    
      try {
        await axios.delete(`/rating/${id}`);
      } catch (err) {
        console.log(err);
      }
  }