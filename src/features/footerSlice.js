import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getData } from "~/firebaseServices";

const initState = {
  footerTypes: [],
  footerData: [],
};

export const fetchFooterTypes = createAsyncThunk(
  "footers/fetchFooterTypes",
  async (_, { dispatch }) => {
    const typeData = [];
    await getData("footer/footerTypes").then((data) => {
      for (let key in data) {
        typeData.push({
          id: key,
          type: data[key],
        });
      }
    });
    dispatch(fetchFooterData());
    return typeData;
  }
);

export const fetchFooterData = createAsyncThunk(
  "footers/fetchFooterData",
  async () => {
    const footerData = [];
    await getData("footer/footerData").then((data) => {
      for (let key in data) {
        footerData.push({
          id: key,
          data: data[key],
        });
      }
    });
    return footerData;
  }
);

const footerSlice = createSlice({
  name: "footers",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFooterTypes.fulfilled, (state, action) => {
        state.footerTypes = action.payload;
      })
      .addCase(fetchFooterData.fulfilled, (state, action) => {
        state.footerData = action.payload;
      });
  },
});

export const selectFooterTypes = (state) => state.footers.footerTypes;
export const selectFooterDataByType = (type) => (state) =>
  state.footers.footerData.filter((data) => data.data.type === type);
export default footerSlice.reducer;
