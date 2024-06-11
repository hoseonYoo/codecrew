import React, { useState } from "react";
import "../../scss/pages/AlarmPage.scss";
import "../../scss/partials/NonePage.scss";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import AlarmBlock from "../../components/study/AlarmBlock";

const AlarmPage = () => {
  return (
    <>
      <BasicLayoutPage headerTitle="알림">
        {/* 컨텐츠 없을 경우 */}
        {/* <div className="nonePage">
        <img src="../assets/imgs/icon/ic_none.png" />
        <h2>아직 도착한 알림이 없어요</h2>
        <p>새로운 소식이 도착하면 알려드릴께요.</p>
      </div> */}
        <div>
          <AlarmBlock />
        </div>
      </BasicLayoutPage>
    </>
  );
};

export default AlarmPage;
