import { createSlice } from "@reduxjs/toolkit";

const initState = {
  auth: null,
  userId: null,
  userName: null,
  needAuth: false,
  shippingLocation: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    authSet(state, action) {
      state.auth = action.payload.auth;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    },
    authNeedSet(state, action) {
      state.needAuth = action.payload;
    },
    shippingLocationSet(state, action) {
      state.shippingLocation = action.payload;
    },
  },
});

export const { authSet, authNeedSet, shippingLocationSet } = authSlice.actions;
export const selectAuth = (state) => ({
  auth: state.auth.auth,
  userName: state.auth.userName,
  userId: state.auth.userId,
});
export const selectNeedAuth = (state) => state.auth.needAuth;
export const selectUserLocation = (state) => state.auth.shippingLocation;
export default authSlice.reducer;
