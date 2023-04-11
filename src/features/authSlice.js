import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getData,
  getAuth,
  onAuthStateChanged,
  updateUserImage,
  deleteUserImage,
  setUserData,
  signOut,
} from "~/firebaseServices";
import { getLocationForUser } from "~/ultil";

const initState = {
  auth: null,
  needAuth: false,
  hasAuth: null,
  userId: null,
  userData: {
    name: null,
    email: null,
    phone: null,
    shippingLocation: null,
    locations: [],
    avatar: null,
    birthDay: null,
    birthMonth: null,
    birthYear: null,
    sex: null,
  },
};

export const setUser = createAsyncThunk(
  "auth/setUser",
  async ({ auth, userId, name, email, imageUrl }) => {
    await setUserData(userId, name, email, imageUrl);
    return {
      auth,
      userId,
      name,
      email,
      imageUrl,
    };
  }
);

export const logOut = createAsyncThunk("auth/logOut", async () => {
  const auth = getAuth();
  await signOut(auth).then(() => {
    window.location.reload();
  });
  return;
});

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (_, { getState }) => {
    const authDone = getState().auth.authDone;
    console.log("auth done:", authDone);
    if (authDone) {
      const authData = getState().auth;
      return authData;
    }

    const auth = getAuth();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        console.log("fetchAuth user:", user);
        if (user) {
          getData("users/" + user.uid).then((data) => {
            getLocationForUser(user.uid).then((location) => {
              console.log("here");
              resolve({
                auth: user.accessToken,
                userId: user.uid,
                hasAuth: true,
                userData: {
                  name:
                    data.username ||
                    user.displayName ||
                    user.email.split("@")[0],
                  email: data.userEmail || user.email,
                  phone: data.phone,
                  shippingLocation: location,
                  avatar: data.userImage,
                  birthDay: data.birthDay,
                  birthMonth: data.birthMonth,
                  birthYear: data.birthYear,
                  sex: data.sex,
                },
              });
            });
          });
        } else {
          resolve(Object.assign({}, null, { hasAuth: false }));
        }
      });
    });
  }
);

export const fetchUserLocations = createAsyncThunk(
  "auth/fetchUserLocations",
  async (_, { getState }) => {
    const userId = getState().auth.userId;
    const shippingLocations = getState().shipping.locations;
    const userLocations = [];
    await getData(`users/${userId}/locations`).then((data) => {
      if (shippingLocations !== "" && data) {
        for (let key in data) {
          const [provinceData] = shippingLocations?.filter(
            (province) => province.id === data[key].province
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

export const updateAvatar = createAsyncThunk(
  "auth/updateUserImage",
  async (imgUrl, { getState }) => {
    const userId = getState().auth.userId;
    await updateUserImage(userId, imgUrl);
    return imgUrl;
  }
);

export const removeAvatar = createAsyncThunk(
  "auth/removeAvatar",
  async (_, { getState }) => {
    const userId = getState().auth.userId;
    await deleteUserImage(userId);
    return;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    authSet(state, action) {
      state.auth = action.payload.auth;
      state.userId = action.payload.userId;
      state.userData.name = action.payload.userName;
    },
    authNeedSet(state, action) {
      state.needAuth = action.payload;
    },
    imageSet(state, action) {
      state.userData.avatar = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state = Object.assign(state, action.payload);
      })
      .addCase(fetchUserLocations.fulfilled, (state, action) => {
        state.userData.locations = action.payload;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.userData.avatar = action.payload;
      })
      .addCase(removeAvatar.fulfilled, (state) => {
        state.userData.avatar = null;
      })
      .addCase(setUser.fulfilled, (state, action) => {
        console.log("action:", action.payload);
        state.auth = action.payload.auth;
        state.userId = action.payload.userId;
        state.userData.name = action.payload.name;
        state.userData.email = action.payload.email;
        state.userData.avatar = action.payload.imageUrl;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.authDone = false;
      });
  },
});

export const { authSet, authNeedSet, getAuthentication, imageSet } =
  authSlice.actions;
export const selectAuth = (state) => ({
  auth: state.auth.auth,
  userId: state.auth.userId,
  userData: {
    name: state.auth.userData.name,
    avatar: state.auth.userData.avatar,
  },
});
export const selectNeedAuth = (state) => state.auth.needAuth;
export const selectUserLocation = (state) =>
  state.auth.userData.shippingLocation;
export const selectUserLocations = (state) => state.auth.userData.locations;
export const selectUserData = (state) => state.auth.userData;
export const selectHasAuth = (state) => state.auth.hasAuth;
export default authSlice.reducer;
