import React from "react";
import "../../scss/partials/StudyMemberBlock.scss";
import useCustomMove from "../../hooks/useCustomMove";
import useMemberProfile from "../../hooks/useMemberProfile";
import useHandleJoinDecline from "../../hooks/useHandleJoinDecline";
import useHandleJoinAccept from "../../hooks/useHandleJoinAccept";

const StudyMemberBlock = ({ email, currentUserEmail, studyCreatorEmail, studyId, studyMemberList }) => {
  const { member, imgSrc } = useMemberProfile(email);
  const { moveToProfilePage } = useCustomMove();
  const { handleJoinDecline } = useHandleJoinDecline();
  const { handleJoinAccept } = useHandleJoinAccept();

  // 현재 멤버의 참가 상태 확인
  const isMemberChecked = studyMemberList.some((memberItem) => memberItem.email === member.email && memberItem.checked);

  // 수락 버튼 클릭 핸들러
  const onAcceptClick = () => {
    handleJoinAccept(studyId, member.email);
  };

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
        {/* userEmail과 studyUserEmail이 일치하고 멤버의 참가 상태가 확인되지 않았을 경우에만 수락/거절 버튼을 노출 */}
        {currentUserEmail === studyCreatorEmail && !isMemberChecked && (
          <>
            <button className="btnSmallPoint" onClick={onAcceptClick}>
              수락
            </button>
            <button className="btnSmallBlack" onClick={onDeclineClick}>
              거절
            </button>
          </>
        )}
        {/* 멤버의 참가 상태가 확인되었을 경우 참가완료 버튼을 노출 */}
        {isMemberChecked && (
          <button className="btnSmallGrey" style={{ marginTop: "16px", cursor: "default" }}>
            참가완료
          </button>
        )}
      </div>
    </div>
  );
};

export default StudyMemberBlock;
