import { API_SERVER_HOST } from "./memberAPI";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/map`;

// 이미지 업로드 요청
export const getAllStudyLocation = async (category) => {
  console.log("카테고리별 표시할 마커들 위치와 id값 가져오기");
  const response = await jwtAxios.get(`${host}`);
  return response.data;
};
