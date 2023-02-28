import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getData, searchData } from "~/firebaseServices";

const initState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (query) => {
    let response;
    if (query) {
      let querySearch = query[0].toUpperCase() + query.slice(1);
      await searchData("products", "name", querySearch).then((data) => {
        response = Object.values(data);
      });
    } else {
      await getData("products").then((data) => {
        response = Object.values(data);
      });
    }

    return response;
  }
);


const productsSlice = createSlice({
  name: "products",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
export const selectAllProducts = (state) => state.products.products;
