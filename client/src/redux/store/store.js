import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../reducer/productReducer";
import { userReducer } from "../reducer/userReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});
