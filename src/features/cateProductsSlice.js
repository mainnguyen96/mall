import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getData } from "~/firebaseServices";

const initState = {
  products: [],
  filterSiderbar: [],
  filterData: [],
  status: "idle",
  error: null,
};

export const fetchCateProducts = createAsyncThunk(
  "cateProducts/fetchCateProducts",
  async (cate) => {
    let response = [];
    await getData("products", "category", cate).then((data) => {
      for (let id in data) {
        response.push({
          id: id,
          data: data[id],
        });
      }
    });
    return response;
  }
);

export const fetchFilterSidebar = createAsyncThunk(
  "cateProducts/fetchFilterSidebar",
  async (cate) => {
    let response = [];
    await getData("filterSidebar", "category", cate).then((data) => {
      for (let id in data) {
        response.push({
          id: id,
          data: data[id],
        });
      }
    });
    return response;
  }
);

export const fetchFilterProducts = createAsyncThunk(
  "cateProducts/fetchFilterProducts",
  async ({ cate, ...filters }) => {
    console.log("run");
    console.log("filter:", Object.entries(filters));
    let filterData = [];
    let response;
    let products;
    for (let filter in filters) {
      if (filters[filter]) {
        if (filter.includes(":")) {
          let [key, value] = filter.split(":");
          filterData.push({ [key]: value });
        } else {
          filterData.push({ filter: filters[filter] });
        }
      }
    }

    console.log("filerData:", Object.entries(filterData[0]));
    await getData("products", "category", cate).then((data) => {
      products = Object.values(data);
    });
    response = products.filter((product) => {
      let ret = true;
      filterData.forEach((filter) => {
        console.log("...:", Object.entries(filter));
        let [[key, value]] = Object.entries(filter);
        console.log("key:", key);
        ret = ret && product[key] === value;
      });
      return ret;
    });
    console.log("products:", products);
    return response;
  }
);

const cateProductsSlice = createSlice({
  name: "cateProducts",
  initialState: initState,
  reducers: {
    filterChanged: {
      reducer(state, action) {
        state.filterData = [...state.filterData, action.payload];
      },
      prepare(filters) {
        return {
          payload: { ...filters },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCateProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCateProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchCateProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFilterSidebar.fulfilled, (state, action) => {
        state.filterSiderbar = action.payload;
      })
      .addCase(fetchFilterProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFilterProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchFilterProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterChanged } = cateProductsSlice.actions;
export const selectAllProducts = (state) => state.cateProducts.products;
export const selectFilterSidebar = (state) => state.cateProducts.filterSiderbar;
export default cateProductsSlice.reducer;
