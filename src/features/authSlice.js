import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getData, getAuth, onAuthStateChanged } from "~/firebaseServices";
import { getLocationForUser } from "~/ultil";

const initState = {
  auth: null,
  userId: null,
  userName: null,
  needAuth: false,
  shippingLocation: null,
  locations: [],
  userImage: null,
  userData: null,
};

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (signup = false) => {
    const auth = getAuth();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (signup) {
            resolve({
              auth: user.accessToken,
              userId: user.uid,
              userName: user.displayName || user.email.split("@")[0],
              userImage: user.photoURL,
              shippingLocation: null,
            });
          } else {
            let location;
            getLocationForUser(user.uid).then((locationData) => {
              location = locationData;
              resolve({
                auth: user.accessToken,
                userId: user.uid,
                userName: user.displayName || user.email.split("@")[0],
                userImage: user.photoURL,
                shippingLocation: location,
              });
            });
          }
        } else {
          resolve(null);
        }
      });
    });
  }
);

export const fetchUserLocations = createAsyncThunk(
  "auth/fetchUserLocations",
  async (_, { getState }) => {
    const userId = getState().auth.userId;
    console.log("userId:", userId);
    const shippingLocations = getState().shipping.locations;
    console.log("shippingLocations:", shippingLocations);
    const userLocations = [];
    await getData("users/" + userId + "/" + "locations").then((data) => {
      if (shippingLocations != "" && data) {
        for (let key in data) {
          const [provinceData] = shippingLocations?.filter(
            (province) => province.id == data[key].province
          );
          const districtData = provinceData.districts[data[key].district];
          const wardData = districtData.wards[data[key].ward];
          userLocations.push({
            label: `${wardData.label}, ${districtData.label}, ${provinceData.label}`,
            id: key,
          });
        }
      }
    });
    return userLocations;
  }
);

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { getState }) => {
    const userId = getState().auth.userId;
    let userData = {};
    await getData("users/" + userId).then((data) => {
      console.log("data:", data);
      if (data) {
        userData = {
          email: data.email,
          phone: data.phone,
          birthDay: data.birthDay,
          birthMonth: data.birthMonth,
          birthYear: data.birthYear,
          sex: data.sex,
        };
      }
    });
    return userData;
  }
);

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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state = Object.assign(state, action.payload);
      })
      .addCase(fetchUserLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      });
  },
});

export const { authSet, authNeedSet, getAuthentication } = authSlice.actions;
export const selectAuth = (state) => ({
  auth: state.auth.auth,
  userName: state.auth.userName,
  userId: state.auth.userId,
  userImage: state.auth.userImage,
});
export const selectNeedAuth = (state) => state.auth.needAuth;
export const selectUserLocation = (state) => state.auth.shippingLocation;
export const selectUserLocations = (state) => state.auth.locations;
export const selectUserData = (state) => state.auth.userData;
export default authSlice.reducer;
