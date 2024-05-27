import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import "../scss/pages/mainPage.scss";
import { useSelector } from "react-redux";
import useCustomMove from "../hooks/useCustomMove";

const MainPage = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const { moveToLogin } = useCustomMove();

  const handleLogin = () => {
    console.log("test");
    console.log(loginState.email);

    if (!loginState.email) {
      moveToLogin();
    } else {
      console.log("마이페이지로 이동");
    }
  };

  return (
    <BasicLayout>
      <div className="Map"></div>
      <div className="bottomBtnWrap">
        <div>
          <button>스터디추가</button>
          <button onClick={handleLogin}>MY</button>
        </div>
      </div>
    </BasicLayout>
  );
};
export default MainPage;
