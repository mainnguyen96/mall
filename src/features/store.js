import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cateProductsReducer from "./cateProductsSlice";
import accountReducer from "./accountSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    cateProducts: cateProductsReducer,
    account: accountReducer,
    auth: authReducer,
  },
});
