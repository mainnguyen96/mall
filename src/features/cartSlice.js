import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getData } from "~/firebaseServices";
import { timeCompare } from "~/ultil";

const initState = {
  products: [],
  status: "idle",
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  console.log("fetchCart");
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
      });
  },
});

export const selectCartProducts = (state) => state.cart.products;
export default cartSlice.reducer;
