import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";

const host = `${API_SERVER_HOST}/api/study`;

// API 등록 요청
export const postAdd = async (study) => {
  const response = await jwtAxios.post(`${host}/Add`, study, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
