import React from "react";
import "../../scss/partials/StudyMemberBlock.scss";
import useCustomMove from "../../hooks/useCustomMove";
import useMemberProfile from "../../hooks/useMemberProfile";
import useHandleJoinDecline from "../../hooks/useHandleJoinDecline";

const StudyMemberBlock = ({ email, currentUserEmail, studyCreatorEmail, studyId }) => {
  const { member, imgSrc } = useMemberProfile(email);
  const { moveToProfilePage } = useCustomMove();
  const { handleJoinDecline } = useHandleJoinDecline(); // 훅을 여기서 호출

  // 거절 버튼 클릭 핸들러
  const onDeclineClick = () => {
    handleJoinDecline(studyId, member.email);
  };

  return (
    <div className="studyMemberBlockWrap">
      {/* 이미지가 있을 경우 배경 이미지로 설정 */}
      <div className="studyMemberBlockImg" style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : null} onClick={() => moveToProfilePage(member.email)}></div>
      <div className="studyMemberBlockTitle">
        {/* 멤버의 닉네임과 이메일을 동적으로 렌더링 */}
        <h3 onClick={() => moveToProfilePage(member.email)}>{member.nickname}</h3>
        <p onClick={() => (window.location.href = `mailto:${member.email}`)}>{member.email}</p>
      </div>
      <div className="studyMemberBlockBtn">
        {/* userEmail과 studyUserEmail이 일치할 경우에만 버튼을 노출 */}
        {currentUserEmail === studyCreatorEmail && (
          <>
            <button className="btnSmallPoint">수락</button>
            {/* onClick 핸들러에 onDeclineClick 함수를 연결 */}
            <button className="btnSmallBlack" onClick={onDeclineClick}>
              거절
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudyMemberBlock;
