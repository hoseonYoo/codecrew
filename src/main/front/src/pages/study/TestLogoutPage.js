import React from "react";
import { logout } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const TestLogoutPage = () => {
  const { execLogout, moveToPath } = useCustomLogin();
  const handleClickLogout = () => {
    execLogout();
    alert("로그아웃 되었습니다.");
    moveToPath("/");
  };
  return (
    <div>
      <h1>로그아웃 테스트 페이지</h1>
      <button onClick={handleClickLogout}>
        <p>로그아웃</p>
      </button>
    </div>
  );
};
export default TestLogoutPage;
