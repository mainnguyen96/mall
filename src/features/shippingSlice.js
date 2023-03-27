import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getData } from "~/firebaseServices";

const initState = {
  methods: [],
  currentMethod: null,
  currentPrice: null,
  locations: [],
  statusMethod: "idle",
  statusLocations: "idle",
};

export const fetchShippingMethods = createAsyncThunk(
  "shipping/fetchShippingMethods",
  async () => {
    const retData = [];
    await getData("shippingMethod").then((data) => {
      for (let key in data) {
        retData.push({
          id: key,
          label: data[key],
        });
      }
    });
    return retData;
  }
);

export const fetchShippingPrice = createAsyncThunk(
  "shipping/fetchShippingPrice",
  async ({ userId, userLocationId }) => {
    const locationData = await getData(
      "users/" + userId + "/" + "locations" + "/" + userLocationId
    );
    const pricesData = await getData(
      "shippingPrice/vietnam" +
        "/" +
        locationData.province +
        "/districts/" +
        locationData.district +
        "/wards/" +
        locationData.ward +
        "/price"
    );
    return pricesData;
  }
);

export const fetchLocations = createAsyncThunk(
  "shipping/fetchLocations",
  async () => {
    const locationData = [];
    await getData("shippingPrice/vietnam").then((data) => {
      for (let key in data) {
        locationData.push({
          id: key,
          label: data[key].label,
          districts: data[key].districts,
        });
      }
    });
    return [
      { label: "select province", id: "select province" },
      ...locationData,
    ];
  }
);

const shippingSlice = createSlice({
  name: "shippingSlice",
  initialState: initState,
  reducers: {
    setCurrentShippingMethod(state, action) {
      state.currentMethod = {
        id: action.payload.id,
        label: action.payload.label,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchShippingMethods.pending, (state, action) => {
        state.statusMethod = "loading";
      })
      .addCase(fetchShippingMethods.fulfilled, (state, action) => {
        state.statusMethod = "succeeded";
        state.methods = action.payload;
        state.currentMethod = state.currentMethod || action.payload[0];
      })
      .addCase(fetchShippingMethods.rejected, (state, action) => {
        state.statusMethod = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchShippingPrice.fulfilled, (state, action) => {
        state.currentPrice = action.payload[state.currentMethod?.id];
      })
      .addCase(fetchLocations.pending, (state, action) => {
        state.statusLocations = "loading";
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
        state.statusLocations = "succeeded";
      });
  },
});

export const { setCurrentShippingMethod } = shippingSlice.actions;
export const selectShippingMethods = (state) => state.shipping.methods;
export const selectCurrentShippingMethod = (state) =>
  state.shipping.currentMethod;
export const selectCurrentShippingPrice = (state) =>
  state.shipping.currentPrice;
export const selectShippingLocations = (state) => state.shipping.locations;
export default shippingSlice.reducer;
