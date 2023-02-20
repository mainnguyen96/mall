import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cateProductsReducer from "./cateProductsSlice";
import accountReducer from "./accountSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    cateProducts: cateProductsReducer,
    account: accountReducer,
  },
});
