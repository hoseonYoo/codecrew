import React from "react";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import "../../scss/pages/AddPage.scss";

const AddPage = () => {
  return (
    <BasicLayoutPage headerTitle="스터디추가">
      <div>
        <form>
          <div className="bottomBtnWrap">
            <button className="btnLargePoint">스터디추가</button>
          </div>
        </form>
      </div>
    </BasicLayoutPage>
  );
};

export default AddPage;
