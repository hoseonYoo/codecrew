import { createSlice } from "@reduxjs/toolkit";
import { getAllStudyLocation } from "../api/mapAPI";

const initState = {
  category: "ALL",
  studyLocationList: 1,
};

const categorySlice = createSlice({
  name: "CategorySlice",
  initialState: initState,
  reducers: {
    setCategory: (state, action) => {
      return { category: action.payload };
    },

    getStudyLocationList: (state, action) => {
      // 카테고리별로 가져온 마커들의 위치와 id값을 저장
      // mapAPI.js에서 가져온 데이터를 저장
      getAllStudyLocation(state.category).then((data) => {
        console.log(data);
        return { studyLocationList: data };
      });

      return state;
    },
  },
});

export const { setCategory, getStudyLocationList } = categorySlice.actions;

export default categorySlice.reducer;
