import React from "react";
import "../../scss/partials/StudyBlock.scss";
const StudyBlock = () => {
  return (
    // 이동 추가
    <div className="studyBlockWrap">
      <div className="studyBlockImg"></div>
      <div className="studyBlockTitle">
        <h3>프로젝트 모임</h3>
        <p>서울 서대문구 신촌로 83</p>
      </div>
      <div className="studyBlockBtn">
        <button className="btnMediumPoint">스터디참가</button>
      </div>
    </div>
  );
};
export default StudyBlock;
