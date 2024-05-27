import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import "../scss/pages/mainPage.scss";

const MainPage = () => {
  return (
    <BasicLayout>
      <div className="Map"></div>
      <div className="bottomBtnWrap">
        <div>
          <button>스터디추가</button>
          <button>MY</button>
        </div>
        <div className="stPopupWrap"></div>
      </div>
    </BasicLayout>
  );
};
export default MainPage;
