import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import CategorySlice from "./slices/CategorySlice";

export default configureStore({
  reducer: {
    loginSlice: loginSlice,
    // 카테고리
    CategorySlice: CategorySlice,
  },
});
