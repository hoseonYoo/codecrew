import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

const host = `${API_SERVER_HOST}/api/member`;

// API 로그인 요청
export const loginPost = async (loginParam) => {
  const header = { Headers: { "Content-Type": "x-www-form-urlencoded" } };
  console.log(loginParam);
  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.password);

  console.log(`${host}/login`);
  console.log(form);

  const response = await axios.post(`${host}/login`, form, header);

  return response.data;
};
