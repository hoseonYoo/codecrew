import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 비동기 액션 생성
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const response = await fetch("/categories");
  const categories = await response.json();
  return categories;
});

// 카테고리 슬라이스 생성
const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export default categoriesSlice.reducer;
