import { getData } from "~/firebaseServices";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initState = {
  productReview: [],
  reviewImages: [],
  rate: null,
  status: "idle",
};

export const fetchProductReview = createAsyncThunk(
  "review/fetchProductReview",
  async (productId) => {
    const userReviewData = [];
    const reviewImages = [];
    let totalRate = 0;
    await getData(`reviews/${productId}`).then((data) => {
      for (let userKey in data) {
        for (let reviewKey in data[userKey]) {
          userReviewData.push({
            userId: userKey,
            reviewId: reviewKey,
            reviewData: data[userKey][reviewKey],
          });
          reviewImages.push(...data[userKey][reviewKey].images);
          totalRate += data[userKey][reviewKey].rate;
        }
      }
    });
    const rate = totalRate / userReviewData.length;
    return { userReviewData, reviewImages, rate };
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProductReview.fulfilled, (state, action) => {
      console.log("rate:", action.payload.rate);
      state.productReview = action.payload.userReviewData;
      state.reviewImages = action.payload.reviewImages;
      state.rate = action.payload.rate;
    });
  },
});

export const selectReviewData = (state) => state.review.productReview;
export const selectReviewImages = (state) => state.review.reviewImages;
export default reviewSlice.reducer;
