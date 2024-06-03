import { API_SERVER_HOST } from "./memberAPI";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/check`;

export const checkPhone = async (phone) => {
  console.log("연락처 중복확인API");
  const response = await jwtAxios.get(`${host}/phone/${phone}`);
  return response.data;
};
