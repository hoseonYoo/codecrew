import React, { useEffect, useState } from "react";
import "../../scss/partials/StudyMemberBlock.scss";
import useMemberProfile from "../../hooks/useMemberProfile";

const StudyMemberBlock = ({ email, currentUserEmail, studyCreatorEmail }) => {
  const { member, imgSrc } = useMemberProfile(email);

  return (
    <div className="studyMemberBlockWrap">
      {/* 이미지가 있을 경우 배경 이미지로 설정 */}
      <div className="studyMemberBlockImg" style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : null}></div>
      <div className="studyMemberBlockTitle">
        {/* 멤버의 닉네임과 이메일을 동적으로 렌더링 */}
        <h3>{member.nickname}</h3>
        <p>{member.email}</p>
      </div>
      <div className="studyMemberBlockBtn">
        {/* userEmail과 studyUserEmail이 일치할 경우에만 버튼을 노출 */}
        {currentUserEmail === studyCreatorEmail && (
          <>
            <button className="btnSmallPoint">수락</button>
            <button className="btnSmallBlack">거절</button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudyMemberBlock;
