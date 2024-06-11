package com.react.project2.domain;

public enum NoticeType {
//  스터디삭제, 스터디수정
    STUDY_DELETE, STUDY_MODIFY,
//  스터디참가신청, 스터디참가거절
    STUDY_PARTICIPATION, STUDY_REJECTION,
//  스터디참가승인, 스터디시작
    STUDY_APPROVAL, STUDY_START,
//  참가일1일전, 참기일당일,
    PRE_PARTICIPATION_DATE, PARTICIPATION_DATE,
//  장소도착, 출석완료
    LOCATION_ARRIVAL, ATTENDANCE_COMPLETE,
//  지각, 결석
    TARDINESS, ABSENCE,
//  회원정지
    BLACK_USER
}
