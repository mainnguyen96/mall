import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { deleteCartData, getData, updateCartData } from "~/firebaseServices";
import { timeCompare } from "~/ultil";
import { setShowCartTippy } from "./productsSlice";

const initState = {
  products: [],
  status: "idle",
  newItemAdded: null,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const response = [];
  await getData("carts/" + userId).then((data) => {
    if (data) {
      console.log("data:", data);
      for (let key in data) {
        response.push({
          id: key,
          data: data[key],
        });
      }
    }
  });
  return response.sort((a, b) => timeCompare(a.data.time, b.data.time));
});

export const addNewCartItem = createAsyncThunk(
  "cart/addNewCartItem",
  async ({ userId, productId, quantity }, { dispatch }) => {
    await updateCartData(userId, productId, quantity);
    dispatch(setShowCartTippy(true));
    return {
      userId,
      productId,
      quantity,
    };
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, { getState }) => {
    const userId = getState().auth.userId;
    await deleteCartData(userId, productId);
    return {
      productId,
    };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewCartItem.fulfilled, (state, action) => {
        state.newItemAdded = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload.productId
        );
      });
  },
});

export const selectCartProducts = (state) => state.cart.products;
export const selectNewItemAdded = (state) => state.cart.newItemAdded;
export default cartSlice.reducer;
