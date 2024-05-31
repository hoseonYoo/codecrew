import { createSlice } from "@reduxjs/toolkit";

const initState = {
  category: "ALL",
};

const categorySlice = createSlice({
  name: "CategorySlice",
  initialState: initState,
  reducers: {
    setCategory: (state, action) => {
      return { category: action.payload };
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
