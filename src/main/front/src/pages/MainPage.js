import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import "../scss/pages/mainPage.scss";
import CategoryFilter from "../layouts/CategoryFilter";

const MainPage = () => {
  return (
    <BasicLayout>
      {/* <CategoryFilter /> */}
      <div className="Map"></div>
      <div className="bottomBtnWrap">
        <div>
          <button>스터디추가</button>
          <button>MY</button>
        </div>
      </div>
    </BasicLayout>
  );
};
export default MainPage;
