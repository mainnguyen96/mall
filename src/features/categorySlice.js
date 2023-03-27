import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getData } from "~/firebaseServices";

const initState = {
  category: null,
  outstanding: null,
};

export const fetchCateData = createAsyncThunk(
  "category/fetchCateData",
  async (_, { dispatch }) => {
    dispatch(fetchCategory());
    dispatch(fetchOutStanding());
  }
);

const fetchCategory = createAsyncThunk("category/fetchCategory", async () => {
  const cate = await getData("category");
  return cate;
});

const fetchOutStanding = createAsyncThunk(
  "category/fetchOutStanding",
  async () => {
    const outStand = await getData("outstanding");
    return outStand;
  }
);

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(fetchOutStanding.fulfilled, (state, action) => {
        state.outstanding = action.payload;
      });
  },
});

export const selectCategory = (state) => state.category.category;
export const selectOutStanding = (state) => state.category.outstanding;
export default categorySlice.reducer;
