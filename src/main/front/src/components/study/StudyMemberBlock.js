import React from "react";
import "../../scss/partials/StudyMemberBlock.scss";
const StudyMemberBlock = () => {
  // 쿠키에서 유저 이메일을 가져옵니다.
  // const userEmailFromCookie = Cookies.get("userEmail");

  // 쿠키의 이메일과 페이지의 이메일이 일치하는지 확인합니다.
  // const isEmailMatch = userEmailFromCookie === emailOnPage;

  return (
    // 이동 추가
    <div className="studyMemberBlockWrap">
      <div className="studyMemberBlockImg"></div>
      <div className="studyMemberBlockTitle">
        <h3>김조은</h3>
        <p>dbghtjs112@naver.com</p>
      </div>
      <div className="studyMemberBlockBtn">
        {/* 관리자 페이지 */}
        {/* <button className="btnSmallPoint">수락</button>
        <button className="btnSmallBlack">거절</button> */}
      </div>
    </div>
  );
};
export default StudyMemberBlock;
