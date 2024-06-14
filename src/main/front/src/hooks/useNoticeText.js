import React from "react";
import useNoticeTextRender from "./useNoticeTextRender";

const UseNoticeText = (notice) => {
  // 렌더링할 알람 텍스트 함수들을 가져옵니다.
  const {
    renderStudyDeleteNoticeText,
    renderStudyModifyNoticeText,
    renderStudyParticipationNoticeText,
    renderStudyWithdrawalNoticeText,
    renderStudyApprovalNoticeText,
    renderStudyRejectionNoticeText,
    renderStudyStartNoticeText,
    renderStudyEndNoticeText,
    renderStudyDeadNoticeText,
    renderPreParticipationDateNoticeText,
    renderParticipationDateNoticeText,
    renderAttendanceCompleteNoticeText,
    renderTardinessNoticeText,
    renderAbsenceNoticeText,
    renderBlackUserNoticeText,
    renderPenaltyNoticeText,
    renderPenaltyDeleteNoticeText,
  } = useNoticeTextRender();

  // 알람 Enum 값에 따라 알맞은 알람 텍스트 생성 함수를 호출하는 객체
  const noticeTypeHandlers = {
    STUDY_DELETE: renderStudyDeleteNoticeText, // 스터디 삭제 알람
    STUDY_MODIFY: renderStudyModifyNoticeText, // 스터디 수정 알람
    STUDY_PARTICIPATION: renderStudyParticipationNoticeText, // 스터디 참가신청 알람
    STUDY_WITHDRAWAL: renderStudyWithdrawalNoticeText, // 스터디 탈퇴 알람
    STUDY_APPROVAL: renderStudyApprovalNoticeText, // 스터디 참가승인 알람
    STUDY_REJECTION: renderStudyRejectionNoticeText, // 스터디 참가거절 알람
    STUDY_START: renderStudyStartNoticeText, // 스터디 시작 알람
    STUDY_END: renderStudyEndNoticeText, // 스터디 종료 알람
    STUDY_DEAD: renderStudyDeadNoticeText, // 스터디 방치 알람
    PRE_PARTICIPATION_DATE: renderPreParticipationDateNoticeText, // 참가일 1일전 알람
    PARTICIPATION_DATE: renderParticipationDateNoticeText, // 참가일 당일 알람
    ATTENDANCE_COMPLETE: renderAttendanceCompleteNoticeText, // 출석 완료 알람
    TARDINESS: renderTardinessNoticeText, // 지각 알람
    ABSENCE: renderAbsenceNoticeText, // 결석 알람
    BLACK_USER: renderBlackUserNoticeText, // 회원 정지 알람
    PENALTY: renderPenaltyNoticeText, // 벌점 알람
    PENALTY_DELETE: renderPenaltyDeleteNoticeText, // 벌점 삭제 알람
  };

  // 알람 종류에 따라 알람 텍스트를 반환하는 함수

  const handler = noticeTypeHandlers[notice.noticeType];

  // 처리 함수가 존재하면 실행하고 결과를 반환합니다.
  if (handler) {
    return handler(notice);
  }
};
export default UseNoticeText;
