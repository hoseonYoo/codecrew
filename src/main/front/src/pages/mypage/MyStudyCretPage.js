import React from "react";
import "../../scss/partials/NonePage.scss";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import StudyBlockMy from "../../components/study/StudyBlockMy";

const MyStudyCretPage = () => {
  return (
    <BasicLayoutPage headerTitle="나의 스터디">
      {/* 컨텐츠 없을 경우 */}
      {/* <div className="nonePage">
        <img src="../assets/imgs/icon/ic_none.png" />
        <h2>아직 생성한 스터디가 없어요</h2>
        <p>새로운 스터디를 생성해보세요</p>
      </div> */}
      {/* block 반복 */}
      <div>
        <StudyBlockMy />
      </div>
    </BasicLayoutPage>
  );
};

export default MyStudyCretPage;
