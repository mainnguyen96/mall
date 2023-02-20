import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "~/firebaseServices/firebaseServices";

const initState = {
  menu: [],
};

export const fetchAccountMenu = createAsyncThunk(
  "account/fetchAccountMenu",
  async () => {
    let response;
    await getData("accountMenu").then((data) => {
      response = Object.values(data);
    });
    return response;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAccountMenu.fulfilled, (state, action) => {
      state.menu = action.payload;
    });
  },
});

export default accountSlice.reducer;
export const selectAllAccountMenu = (state) => state.account.menu;
