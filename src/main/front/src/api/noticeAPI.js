import { API_SERVER_HOST } from "./memberAPI";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/notice`;

// 알람 갯수 조회
export const getNoticeCount = async (email) => {
  const response = await jwtAxios.get(`${host}/count/${email}`);
  return response.data;
};
