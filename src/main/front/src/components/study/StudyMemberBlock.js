import React, { useState } from "react";
import "../../scss/partials/StudyMemberBlock.scss";
import useCustomMove from "../../hooks/useCustomMove";
import useMemberProfile from "../../hooks/useMemberProfile";
import useHandleStudyMember from "../../hooks/useHandleStudyMember";

// StudyMemberBlock 컴포넌트 정의
const StudyMemberBlock = ({ memberData, currentUserEmail, studyCreatorEmail, studyId, reRender, studyConfirmed, LateCheck }) => {
  // 멤버 프로필 정보와 이미지 URL을 가져오는 커스텀 훅 사용
  const { member, imgSrc } = useMemberProfile(memberData.email);
  // 페이지 이동 관련 커스텀 훅 사용
  const { moveToProfilePage } = useCustomMove();

  // 스터디 참가 수락,거절,결석 처리를 위한 커스텀 훅 사용
  const { handleJoinDecline, handleJoinAccept, handleAbsence } = useHandleStudyMember();

  // 수락 버튼 클릭 핸들러
  const onAcceptClick = async () => {
    await handleJoinAccept(studyId, member.email);
    reRender();
  };
  // 거절 버튼 클릭 핸들러
  const onDeclineClick = async () => {
    await handleJoinDecline(studyId, member.email);
    reRender();
  };
  // 결석 버튼 클릭 핸들러
  const onAbsenceClick = async () => {
    await handleAbsence(studyId, member.email);
    reRender();
  };

  // 버튼 렌더링 함수
  const renderButtonCheck = () => {
    console.log(memberData.status);
    if (memberData.status === "HOLD") {
      if (currentUserEmail === studyCreatorEmail) {
        // 생성자
        return renderSelectButton();
      } else {
        // 생성자 아닌 경우
        return renderHoldButton();
      }
    } else if (memberData.status === "ACCEPT") {
      if (!studyConfirmed) {
        return renderAcceptedButton();
      } else if (studyConfirmed && LateCheck) {
        return renderAbsenceButton();
      } else {
        return renderAcceptedStartButton();
      }
    } else if (memberData.status === "ABSENCE") {
      // 결석
      if (currentUserEmail === studyCreatorEmail) {
        // 생성자
        return renderAbsencedButton();
      } else {
        return renderAbsenceButton();
      }
    } else if (memberData.status === "LATE") {
      // 지각
      if (currentUserEmail === studyCreatorEmail) {
        return renderLatedButton();
      } else {
        return renderLatedButton();
      }
    } else if (memberData.status === "DECLINE") {
      return renderDeclinedButton();
    } else if (memberData.status === "WITHDRAW") {
      return renderWithdrawnButton();
    } else if (memberData.status === "ARRIVE") {
      return renderArriveButton();
    }
  };

  // 수락, 거절 버튼 렌더링 함수
  const renderSelectButton = () => {
    return (
      <>
        <button className="btnSmallPoint" onClick={onAcceptClick}>
          수락하기
        </button>
        <button className="btnSmallBlack" onClick={onDeclineClick}>
          거절하기
        </button>
      </>
    );
  };

  const renderAcceptedButton = () => {
    return (
      <>
        <button className="btnSmallGrey" style={{ marginTop: "16px", cursor: "default" }}>
          참가완료
        </button>
      </>
    );
  };

  const renderAcceptedStartButton = () => {
    return (
      <>
        <button className="btnSmallGrey" style={{ marginTop: "16px", cursor: "default" }}>
          도착예정
        </button>
      </>
    );
  };

  const renderDeclinedButton = () => {
    return (
      <>
        <button className="btnSmallGrey" style={{ marginTop: "16px", cursor: "default" }}>
          거절
        </button>
      </>
    );
  };

  const renderAbsenceButton = () => {
    console.log(LateCheck);
    return (
      <>
        <button className="btnSmallBlack" style={{ marginTop: "16px" }} onClick={onAbsenceClick}>
          결석처리
        </button>
      </>
    );
  };

  const renderAbsencedButton = () => {
    return (
      <>
        <button className="btnSmallGrey" style={{ marginTop: "16px", cursor: "default" }}>
          결석
        </button>
      </>
    );
  };

  const renderLatedButton = () => {
    return (
      <>
        <button className="btnSmallGrey" style={{ marginTop: "16px", cursor: "default" }}>
          지각
        </button>
      </>
    );
  };

  const renderWithdrawnButton = () => {
    return (
      <>
        <button className="btnSmallGrey" style={{ marginTop: "16px", cursor: "default" }}>
          탈퇴
        </button>
      </>
    );
  };

  const renderArriveButton = () => {
    return (
      <>
        <button className="btnSmallPoint" style={{ marginTop: "16px", cursor: "default" }}>
          출석완료
        </button>
      </>
    );
  };

  const renderHoldButton = () => {
    return (
      <button className="btnSmallPoint" style={{ marginTop: "16px", cursor: "default" }}>
        참가대기
      </button>
    );
  };

  // 컴포넌트 렌더링
  return (
    <div className="studyMemberBlockWrap">
      <div className="studyMemberBlockImg" style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : null} onClick={() => moveToProfilePage(member.email)}></div>
      <div className="studyMemberBlockTitle">
        <h3 onClick={() => moveToProfilePage(member.email)}>{member.nickname}</h3>
        <p onClick={() => (window.location.href = `mailto:${member.email}`)}>{member.email}</p>
      </div>
      <div className="studyMemberBlockBtn">{renderButtonCheck()}</div>
    </div>
  );
};

export default StudyMemberBlock;
