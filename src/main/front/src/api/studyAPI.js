import axios from "axios";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./memberAPI";

const host = `${API_SERVER_HOST}/api/study`;

// API 등록 요청
export const postAdd = async (study) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const response = await jwtAxios.post(`${host}/`, study, header);
  return response.data;
};

// API 스터디 조회 요청
export const getOne = async (id) => {
  console.log(`${host}/${id}`);
  const response = await axios.get(`${host}/${id}`);
  console.log(response.data);
  return response.data;
};

// API 스터디 수정 요청
export const modifyStudy = async (study) => {
  console.log(`${host}/modify`);
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const response = await jwtAxios.put(`${host}/modify`, study, header);
  return response.data;
};
