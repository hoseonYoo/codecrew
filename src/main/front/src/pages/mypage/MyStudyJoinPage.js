import React from "react";
import "../../scss/partials/NonePage.scss";
import "../../scss/pages/MySTListPage.scss";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import StudyBlockMy from "../../components/study/StudyBlockMy";
import useCustomMove from "../../hooks/useCustomMove";

const MyStudyJoinPage = () => {
  const { moveToMain } = useCustomMove();
  return (
    <BasicLayoutPage headerTitle="참가 스터디">
      {/* 컨텐츠 없을 경우 */}
      <div className="nonePage">
        <img src="../assets/imgs/icon/ic_none.png" />
        <h2>아직 참가한 스터디가 없어요</h2>
        <p onClick={moveToMain}>새로운 스터디에 참가해보세요</p>
      </div>
      {/* block 반복 */}
      {/* <div className="myStListFilter">
        <button>모집중</button>
        <button>종료</button>
      </div>
      <div>
        <StudyBlockMy />
      </div> */}
    </BasicLayoutPage>
  );
};

export default MyStudyJoinPage;
