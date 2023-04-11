import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getData, searchData } from "~/firebaseServices";

const initState = {
  products: [],
  status: "idle",
  error: null,
  showCartTippy: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (query) => {
    let response = [];
    if (query) {
      let querySearch = query[0].toUpperCase() + query.slice(1);
      await searchData("products", "name", querySearch).then((data) => {
        for (let id in data) {
          response.push({
            id: id,
            data: data[id],
          });
        }
      });
    } else {
      await getData("products").then((data) => {
        for (let id in data) {
          response.push({
            id: id,
            data: data[id],
          });
        }
      });
    }

    return response;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: initState,
  reducers: {
    setShowCartTippy(state, action) {
      state.showCartTippy = action.payload;
    },
  },
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

export const { setShowCartTippy } = productsSlice.actions;
export const selectAllProducts = (state) => state.products.products;
export const selectShowCartTippy = (state) => state.products.showCartTippy;
export default productsSlice.reducer;
