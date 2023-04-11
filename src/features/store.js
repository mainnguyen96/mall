import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./productsSlice";
import cateProductsReducer from "./cateProductsSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import shippingReducer from "./shippingSlice";
import purchasesReducer from "./purchasesSlice";
import footerReducer from "./footerSlice";
import categoryRedcer from "./categorySlice";
import reviewReducer from "./reviewSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    cateProducts: cateProductsReducer,
    auth: authReducer,
    cart: cartReducer,
    shipping: shippingReducer,
    purchases: purchasesReducer,
    footers: footerReducer,
    category: categoryRedcer,
    review: reviewReducer,
  },
});
