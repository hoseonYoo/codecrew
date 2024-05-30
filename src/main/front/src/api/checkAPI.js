import { API_SERVER_HOST } from "./memberAPI";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/check`;

// 이미지 업로드 요청
export const uploadImage = async (image) => {
  console.log("이미지 업로드API");
  // 헤더 추가
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const response = await jwtAxios.post(`${host}/upload`, image, header);
  return response.data;
};

export const checkPhone = async (phone) => {
  console.log("연락처 중복확인API");
  const response = await jwtAxios.get(`${host}/phone/${phone}`);
  return response.data;
};
