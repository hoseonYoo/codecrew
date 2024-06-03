import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import categorySlice from "./slices/categorySlice";

export default configureStore({
  reducer: {
    // 로그인
    loginSlice: loginSlice,
    categorySlice: categorySlice,
  },
});
