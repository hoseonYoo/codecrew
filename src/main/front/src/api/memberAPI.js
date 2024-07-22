import axios from "axios";

// TODO API 서버 주소
// export const API_SERVER_HOST = "http://192.168.0.55:8080";
// export const API_SERVER_HOST = "http://192.168.0.48:8080";
export const API_SERVER_HOST = "http://15.164.183.79:8080";

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

// API 회원 정보요청
export const getMember = async (email) => {
  const response = await axios.get(`${host}/${email}`);
  return response.data;
};

// API 회원 정보 수정
export const modifyMember = async (member) => {
  console.log(`${host}/modify`);
  console.log(member);
  const response = await axios.put(`${host}/modify`, member);
  return response.data;
};

// 회원 탈퇴
export const disableMember = async (email) => {
  try {
    const response = await axios.put(`${host}/${email}/disable`);
    return response.data;
  } catch (error) {
    console.error("회원 탈퇴에 실패했습니다.", error);
  }
};
