// TODO 테스트용 API 삭제 예정

import { API_SERVER_HOST } from "./memberAPI";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/test`;

// 테스트용 API 요청
export const testGet = async () => {
  const response = await jwtAxios.get(`${prefix}/test`);
  return response.data;
};
