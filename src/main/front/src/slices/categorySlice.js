import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStudyLocation } from "../api/mapAPI";

export const getStudyLocationList = createAsyncThunk(
  "category/getStudyLocationList",
  async (category, thunkAPI) => {
    console.log("category : ", category);
    const data = await getAllStudyLocation(category);
    return data;
  },
);

const initState = {
  category: "ALL",
  studyLocationList: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "CategorySlice",
  initialState: initState,
  reducers: {
    setCategory: (state, action) => {
      console.log("Setting category:", action.payload);
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudyLocationList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getStudyLocationList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studyLocationList = action.payload;
      })
      .addCase(getStudyLocationList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
