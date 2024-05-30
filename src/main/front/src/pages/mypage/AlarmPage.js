import React from "react";
import "../../scss/pages/AlarmPage.scss";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";

const AlarmPage = () => {
  return (
    <BasicLayoutPage headerTitle="정보수정">
      <div className="nonePage">
        <h2>새로운 알림이 없습니다.</h2>
        <img src="../assets/imgs/icon/ic_none.png" />
      </div>
    </BasicLayoutPage>
  );
};

export default AlarmPage;
