import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getData } from "~/firebaseServices";
import {
  timeCompare,
  convertStringToDateFormat,
  getShippingInfo,
} from "~/ultil";

const initState = {
  purchases: [],
  purchaseDetail: null,
  status: "idle",
  error: null,
};

export const fetchPurchases = createAsyncThunk(
  "purchases/fetchPurchases",
  async (_, { getState }) => {
    const userId = getState().auth.userId;
    const purchaseData = [];
    await getData("purchases/" + userId).then((data) => {
      for (let key in data) {
        purchaseData.push({
          time: data[key].time,
          total: data[key].total,
          products: Object.entries(data[key].products),
          id: key,
          location: data[key].location,
          shippingMethod: data[key].shippingMethod,
        });
      }
    });
    return purchaseData.sort((a, b) => timeCompare(a.time, b.time));
  }
);

export const fetchPurchaseDetail = createAsyncThunk(
  "purchases/fetchPurchaseDetail",
  async (purchaseId, { getState }) => {
    const purchaseDetail = {};
    const userId = getState().auth.userId;
    const purchase = getState().purchases.purchases.filter(
      (purchase) => purchase.id === purchaseId
    )[0];
    purchaseDetail.products = purchase.products;
    purchaseDetail.total = purchase.total;
    purchaseDetail.time = convertStringToDateFormat(purchase.time);

    purchaseDetail.shippingMethod = await getData(
      "shippingMethod/" + purchase.shippingMethod
    );

    {
      const shippingInfo = await getShippingInfo(
        userId,
        purchase.location,
        purchase.shippingMethod
      );
      purchaseDetail.location = shippingInfo.location;
      purchaseDetail.shippingFee = shippingInfo.fee;
      purchaseDetail.provision = purchaseDetail.total - shippingInfo.fee;
    }
    console.log("purchaseDetail:", purchaseDetail);
    return purchaseDetail;
  }
);

const purchasesSlice = createSlice({
  name: "purchases",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPurchases.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.purchases = action.payload;
      })
      .addCase(fetchPurchases.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPurchaseDetail.fulfilled, (state, action) => {
        state.purchaseDetail = action.payload;
      });
  },
});

export const selectPurchases = (state) => state.purchases.purchases;
export const selectPurchaseById = (purchaseId) => (state) =>
  state.purchases.purchases.filter((purchase) => purchase.id === purchaseId)[0];
export const selectPurchaseDetail = (state) => state.purchases.purchaseDetail;
export default purchasesSlice.reducer;
