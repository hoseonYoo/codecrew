import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";

export default configureStore({
  reducer: {
    // 로그인
    loginSlice: loginSlice,
  },
});
