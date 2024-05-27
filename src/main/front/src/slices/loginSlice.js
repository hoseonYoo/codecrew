// email 에 해당하는 값이 있으면 -> 로그인 상태, 없으면 -> 비로그인 상태로 간주
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberAPI";

const initState = {
  email: "",
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: initState,
  reducers: {
    // 동기 작업 처리
    login: (state, action) => {
      console.log("login....");
      const data = action.payload;
      console.log(data);
      // 리덕스 스토어에 수정할 새로운 상태값 리턴
      return { email: data.email };
    },
    logout: (state) => {
      console.log("logout");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled");
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

// 액션크리에이터 외부로 내보내기
export const { login, logout } = loginSlice.actions;
// 리듀서 외부로 내보내기 -> configureStore에 등록
export default loginSlice.reducer;
